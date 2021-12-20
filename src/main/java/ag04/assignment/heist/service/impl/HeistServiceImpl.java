package ag04.assignment.heist.service.impl;

import ag04.assignment.heist.config.HeistProperties;
import ag04.assignment.heist.domain.*;
import ag04.assignment.heist.dto.*;
import ag04.assignment.heist.exception.BadRequestAlertException;
import ag04.assignment.heist.exception.MethodNotAllowedException;
import ag04.assignment.heist.exception.PersistenceValidationException;
import ag04.assignment.heist.mapper.HeistMapper;
import ag04.assignment.heist.mapper.HeistSkillMapper;
import ag04.assignment.heist.mapper.MemberMapper;
import ag04.assignment.heist.repository.HeistRepository;
import ag04.assignment.heist.scheduler.ScheduleUtils;
import ag04.assignment.heist.scheduler.TriggerDetails;
import ag04.assignment.heist.scheduler.job.FinishHeistJob;
import ag04.assignment.heist.scheduler.job.ImproveSkillsJob;
import ag04.assignment.heist.scheduler.job.StartHeistJob;
import ag04.assignment.heist.service.*;
import ag04.assignment.heist.util.HeistOutcomeSummary;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import static ag04.assignment.heist.util.EligibleMembersVerifier.filterUnEligibleMembers;
import static ag04.assignment.heist.util.EligibleMembersVerifier.findEligibleMembers;
import static ag04.assignment.heist.util.HeistOutcomeCalculator.*;

@Service
public class HeistServiceImpl implements HeistService {

    private static final Logger logger = LoggerFactory.getLogger(HeistServiceImpl.class);

    private final HeistMapper heistMapper;
    private final HeistSkillMapper heistSkillMapper;
    private final HeistRepository heistRepository;
    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final HeistParticipantService heistParticipantService;
    private final SchedulerService jobSchedulerService;
    private final EmailService emailService;
    private final HeistProperties heistProperties;

    public HeistServiceImpl(HeistMapper heistMapper,
                            HeistSkillMapper heistSkillMapper,
                            HeistRepository heistRepository,
                            MemberService memberService,
                            MemberMapper memberMapper,
                            HeistParticipantService heistParticipantService,
                            SchedulerService jobSchedulerService,
                            EmailService emailService, HeistProperties heistProperties) {
        this.heistMapper = heistMapper;
        this.heistSkillMapper = heistSkillMapper;
        this.heistRepository = heistRepository;
        this.memberService = memberService;
        this.memberMapper = memberMapper;
        this.heistParticipantService = heistParticipantService;
        this.jobSchedulerService = jobSchedulerService;
        this.emailService = emailService;
        this.heistProperties = heistProperties;
    }

    @Override
    public Heist getHeistById(Long id) {
        return heistRepository.findOneById(id).orElseThrow(
                () -> new EntityNotFoundException("Resource not found. Heist with id: '" + id + "' does not exist")
        );
    }

    @Override
    public Heist createNewHeist(HeistDTO heistDTO) {
        heistRepository
                .findOneByName(heistDTO.getName())
                .ifPresent(existingHeist -> {
                    throw new BadRequestAlertException("Cannot create heist. Heist with same name already exists");
                });

        Heist newHeist = heistMapper.heistDTOToHeist(heistDTO);

        Heist persistedHeist;

        if(newHeist != null) {
            persistedHeist = heistRepository.save(newHeist);
        } else {
            throw new PersistenceValidationException("Unable to save heist");
        }

        // Get heist start and end date and implement scheduler to start and finish heist automatically
        Date heistStartDate = newHeist.getStartDate();
        Date heistEndDate = newHeist.getEndDate();

        final TriggerDetails startHeistTriggerDetails = new TriggerDetails(
                1,
                false,
                0,
                ScheduleUtils.getDateDiff(heistStartDate, TimeUnit.MILLISECONDS),
                newHeist.getId());

        final TriggerDetails finishHeistTriggerDetails = new TriggerDetails(
                1,
                false,
                0,
                ScheduleUtils.getDateDiff(heistEndDate, TimeUnit.MILLISECONDS),
                newHeist.getId());

        jobSchedulerService.schedule(StartHeistJob.class, startHeistTriggerDetails);
        jobSchedulerService.schedule(FinishHeistJob.class, finishHeistTriggerDetails);

        return persistedHeist;
    }

    @Override
    public EligibleMembersDTO getEligibleMembers(Long heist_id) {
        Heist heist = getHeistById(heist_id);

        EligibleMembersDTO eligibleMembersDTO = new EligibleMembersDTO();

        List<HeistSkillDTO> requiredHeistSkills = heistSkillMapper.heistSkillsToHeistSkillDTOs(heist.getSkills());
        eligibleMembersDTO.setRequiredSkills(requiredHeistSkills);

        List<MemberDTO> availableMembers = memberMapper.membersToMemberDTOs(memberService.getAllMembers()).stream()
                .filter(memberDTO -> memberDTO.getStatus().toString().matches("AVAILABLE|RETIRED"))
                .collect(Collectors.toList());

        Set<MemberDTO> eligibleMembers = findEligibleMembers(availableMembers, requiredHeistSkills);

        Set<MemberDTO> alreadyConfirmedParticipants = new HashSet<>();

        for(MemberDTO memberDTO : eligibleMembers) {
            Member member = memberService.getMemberByName(memberDTO.getName());
            Optional<List<HeistParticipant>> potentiallyConfirmedParticipants = heistParticipantService.getAllHeistsByParticipantId(member.getId());
            if(potentiallyConfirmedParticipants.isPresent()) {
                for(HeistParticipant heistParticipant : potentiallyConfirmedParticipants.get()) {
                    if(heist.getStartDate().before(heistParticipant.getHeist().getEndDate())  &&
                        heist.getEndDate().after(heistParticipant.getHeist().getStartDate())) {
                        alreadyConfirmedParticipants.add(memberDTO);
                    }
                }
            }
        }

        Set<MemberDTO> finalEligibleMemberSelection = eligibleMembers.stream()
                .filter(memberDTO -> Collections.frequency(alreadyConfirmedParticipants, memberDTO) < 1)
                .collect(Collectors.toSet());

        if(finalEligibleMemberSelection.isEmpty()) {
            throw new MethodNotAllowedException("All eligible and available Members have already been confirmed participants of another ongoing heist");
        } else {
            eligibleMembersDTO.setEligibleMembers(finalEligibleMemberSelection);
        }

        return eligibleMembersDTO;
    }

    @Override
    public void confirmMembersAsHeistParticipants(Long heist_id, HeistParticipantSetDTO heistParticipantDTO) {
        Heist heist = getHeistById(heist_id);

        if(!heist.getHeistStatus().equals(HeistStatus.PLANNING)) {
            throw new MethodNotAllowedException("Cannot confirm participants. Heist status is not 'PLANNING'!");
        }

        Set<String> confirmedMemberNames = heistParticipantDTO.getMembers();
        Set<Member> confirmedMembers = new HashSet<>();

        for(String memberName : confirmedMemberNames) {
            confirmedMembers.add(memberService.getMemberByName(memberName));
        }

        Optional<Member> unavailableMember = confirmedMembers.stream()
                .filter(member -> !member.getStatus().toString().matches("AVAILABLE|RETIRED")).findFirst();
        if(unavailableMember.isPresent()) {
            throw new BadRequestAlertException(
                    "Cannot confirm member! Member named '" + unavailableMember.get().getName() + "' is '" + unavailableMember.get().getStatus().toString() + "'");
        }

        List<HeistSkillDTO> requiredHeistSkills = heistSkillMapper.heistSkillsToHeistSkillDTOs(heist.getSkills());
        Set<Member> eligibleMembers = filterUnEligibleMembers(confirmedMembers, requiredHeistSkills);
        Optional<Member> unEligibleMember = confirmedMembers.stream()
                .filter(member -> Collections.frequency(eligibleMembers, member) < 1).findFirst();
        if(unEligibleMember.isPresent()) {
            throw new BadRequestAlertException("Member '" + unEligibleMember.get().getName() + "' does not meet heist skill requirements");
        }

        for(Member member : confirmedMembers) {
            Optional<List<HeistParticipant>> alreadyConfirmedParticipants = heistParticipantService.getAllHeistsByParticipantId(member.getId());
            if(alreadyConfirmedParticipants.isPresent()) {
                for(HeistParticipant heistParticipant : alreadyConfirmedParticipants.get()) {
                    if(heist.getStartDate().before(heistParticipant.getHeist().getEndDate())  &&
                        heist.getEndDate().after(heistParticipant.getHeist().getStartDate())) {
                        throw new BadRequestAlertException("Member '" + heistParticipant.getMember().getName() + "' is already confirmed participant of another heist happening at the same time");
                    }
                }
            }
        }

        Set<HeistParticipant> heistParticipants = new HashSet<>();

        for(Member member : confirmedMembers) {
            HeistParticipant heistParticipant = new HeistParticipant();
            heistParticipant.setMember(member);
            heistParticipants.add(heistParticipant);

            emailService.notifyMember(
                    member.getEmail(),
                    "Participation confirmation",
                    String.format("Mr. %s, You have been confirmed to participate in a '%s' heist", member.getName(), heist.getName())
            );
        }

        heist.setParticipants(heistParticipants);
        heist.setHeistStatus(HeistStatus.READY);
        heistRepository.save(heist);
    }

    public void startHeistManually(Long heist_id) {
        Heist heist = getHeistById(heist_id);

        if(heist.getHeistStatus().equals(HeistStatus.READY)) {
            heist.setHeistStatus(HeistStatus.IN_PROGRESS);
            for(HeistParticipant participant : heist.getParticipants()) {
                emailService.notifyMember(
                        participant.getMember().getEmail(),
                        "Status update notice",
                        String.format("Mr. %s, heist '%s' is now in progress", participant.getMember().getName(), heist.getName())
                );
            }
        } else {
            throw new MethodNotAllowedException("Cannot start heist. Heist status must be 'READY'");
        }

        heistRepository.save(heist);
    }

    @Override
    public HeistDTO getHeistDetails(Long heist_id) {
        return heistMapper.heistToHeistDTO(this.getHeistById(heist_id));
    }

    @Override
    public Set<MemberDTO> getAllHeistParticipants(Long heist_id) {
        Heist heist = this.getHeistById(heist_id);

        if(heist.getHeistStatus() == HeistStatus.PLANNING) {
            throw new MethodNotAllowedException("Cannot view members. Heist status is 'PLANNING'");
        }

        Optional<Set<HeistParticipant>> heistParticipants = heistParticipantService.getAllParticipantsByHeistId(heist_id);

        Set<MemberDTO> heistMembers = new HashSet<>();

        if(heistParticipants.isPresent()) {
            for(HeistParticipant heistParticipant : heistParticipants.get()) {
                heistMembers.add(memberMapper.memberToMemberDTO(heistParticipant.getMember()));
            }
        }

        return heistMembers;
    }

    @Override
    public List<HeistSkillDTO> getAllHeistSkills(Long heist_id) {
        return heistSkillMapper.heistSkillsToHeistSkillDTOs(this.getHeistById(heist_id).getSkills());
    }

    @Override
    public HeistStatusDTO getHeistStatus(Long heist_id) {
        HeistStatusDTO heistStatusDTO = new HeistStatusDTO();
        heistStatusDTO.setStatus(this.getHeistById(heist_id).getHeistStatus().toString());
        return heistStatusDTO;
    }

    @Override
    public void startHeist(Long heist_id) {
        Heist heist = this.getHeistById(heist_id);
        heist.setHeistStatus(HeistStatus.IN_PROGRESS);

        for(HeistParticipant participant : heist.getParticipants()) {
            emailService.notifyMember(
                    participant.getMember().getEmail(),
                    "Status update notice",
                    String.format("Mr. %s, Heist '%s' is now in progress", participant.getMember().getName(), heist.getName())
            );
        }

        final TriggerDetails ImproveSkillsTriggerDetails = new TriggerDetails(
                true,
                heistProperties.getLevelUpTime() * 1000,
                heistProperties.getLevelUpTime() * 1000,
                heist
        );

        jobSchedulerService.schedule(ImproveSkillsJob.class, ImproveSkillsTriggerDetails);

        heistRepository.save(heist);
    }

    public void finishHeist(Long heist_id) {
        Heist heist = this.getHeistById(heist_id);
        heist.setHeistStatus(HeistStatus.FINISHED);

        for(HeistParticipant participant : heist.getParticipants()) {
            emailService.notifyMember(
                    participant.getMember().getEmail(),
                    "Status update notice",
                    String.format("Mr. %s, heist '%s' is finished", participant.getMember().getName(), heist.getName())
            );
        }

        jobSchedulerService.terminateJob(ImproveSkillsJob.class);

        HeistOutcomeSummary summary = calculateHeistOutcome(calculateMembersAllotment(heist));
        heist.setHeistOutcome(summary.getOutcome());

        logger.info("HeistOutcomeSummary -> {}", summary);

        memberService.updateMemberStatusByHeistOutcome(heist_id, summary);
        heistParticipantService.removeRemainingAvailableMembers(heist_id);

        heistRepository.save(heist);
    }

    @Override
    public HeistOutcomeDTO getHeistOutcome(Long heist_id) {
        Heist heist = getHeistById(heist_id);

        if(heist.getHeistStatus() != HeistStatus.FINISHED) {
            throw new MethodNotAllowedException("Cannot view outcome, heist is not yet finished!");
        }

        return new HeistOutcomeDTO(heist.getHeistOutcome().toString());
    }
}
