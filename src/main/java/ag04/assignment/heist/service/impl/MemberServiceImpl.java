package ag04.assignment.heist.service.impl;

import ag04.assignment.heist.domain.HeistParticipant;
import ag04.assignment.heist.domain.Member;
import ag04.assignment.heist.domain.MemberStatus;
import ag04.assignment.heist.dto.MemberDTO;
import ag04.assignment.heist.exception.BadRequestAlertException;
import ag04.assignment.heist.exception.PersistenceValidationException;
import ag04.assignment.heist.mapper.MemberMapper;
import ag04.assignment.heist.repository.MemberRepository;
import ag04.assignment.heist.service.EmailService;
import ag04.assignment.heist.service.HeistParticipantService;
import ag04.assignment.heist.service.MemberService;
import ag04.assignment.heist.util.HeistOutcomeSummary;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.*;

import static ag04.assignment.heist.util.HeistOutcomeCalculator.*;

@Service
public class MemberServiceImpl implements MemberService {

    private final MemberMapper memberMapper;
    private final MemberRepository memberRepository;
    private final HeistParticipantService heistParticipantService;
    private final EmailService emailService;

    public MemberServiceImpl(MemberMapper memberMapper,
                             MemberRepository memberRepository,
                             HeistParticipantService heistParticipantService, EmailService emailService) {
        this.memberMapper = memberMapper;
        this.memberRepository = memberRepository;
        this.heistParticipantService = heistParticipantService;
        this.emailService = emailService;
    }

    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    @Override
    public Member getMemberById(Long id) {
            return memberRepository.findMemberById(id).orElseThrow(
                    () -> new EntityNotFoundException("Resource not found. Member with id: '" + id + "' does not exist"));
    }

    @Override
    public Member getMemberByName(String memberName) {
        return memberRepository.findOneByName(memberName).orElseThrow(
                () -> new EntityNotFoundException("Resource not found. Member with name: '" + memberName + "' does not exist")
        );
    }

    @Override
    public Member createNewMember(MemberDTO memberDTO) {
        if(this.memberIsAlreadyPersisted(memberDTO)) {
            throw new BadRequestAlertException(
                    "Cannot create member. Member with the same name or email address already exists!"
            );
        }

        Member newMember = memberMapper.memberDTOToMember(memberDTO);

        if(newMember != null) {
            memberRepository.save(newMember);
        } else {
            throw new PersistenceValidationException("Unable to save member");
        }

        emailService.notifyMember(
                newMember.getEmail(),
                "Membership admission notice",
                String.format("Mr. %s, You have been admitted to 'La Casa De Papel' membership", newMember.getName())
        );

        return newMember;
    }

    public boolean memberIsAlreadyPersisted(MemberDTO memberDTO) {
        return memberRepository.findOneByEmail(memberDTO.getEmail()).isPresent() ||
                memberRepository.findOneByName(memberDTO.getName()).isPresent();
    }

    public MemberDTO getMemberDetails(Long member_id) {
        return memberMapper.memberToMemberDTO(this.getMemberById(member_id));
    }

    public void updateMemberStatusByHeistOutcome(Long heist_id, HeistOutcomeSummary summary) {
        Optional<Set<HeistParticipant>> heistParticipants = heistParticipantService.getAllParticipantsByHeistId(heist_id);

        List<Member> heistMembers = new ArrayList<>();

        if(heistParticipants.isPresent()) {
            for(HeistParticipant participant : heistParticipants.get()) {
                heistMembers.add(this.getMemberById(participant.getMember().getId()));
            }
        }

        Collections.shuffle(heistMembers);

        long membersAffected;

        switch (summary.getRepercussion())
        {
            case REPERCUSSION_FAIL_50:
                for (Member member : heistMembers) {
                    member.setStatus(new Random().nextBoolean() ? MemberStatus.EXPIRED : MemberStatus.INCARCERATED);
                    memberRepository.save(member);
                }
                break;
            case REPERCUSSION_FAIL_50_75:
                membersAffected = Math.round(heistMembers.size() * (2d / 3d));
                for (int i = 0; i < membersAffected; i++) {
                    heistMembers.get(i).setStatus(new Random().nextBoolean() ? MemberStatus.EXPIRED : MemberStatus.INCARCERATED);
                    memberRepository.save(heistMembers.get(i));
                }
                break;
            case REPERCUSSION_SUCCESS_50_75:
                membersAffected = Math.round(heistMembers.size() * (1d / 3d));
                for (int i = 0; i < membersAffected; i++) {
                    heistMembers.get(i).setStatus(new Random().nextBoolean() ? MemberStatus.EXPIRED : MemberStatus.INCARCERATED);
                    memberRepository.save(heistMembers.get(i));
                }
                break;
            case REPERCUSSION_SUCCESS_75_100:
                membersAffected = Math.round(heistMembers.size() * (1d / 3d));
                for (int i = 0; i < membersAffected; i++) {
                    heistMembers.get(i).setStatus(MemberStatus.INCARCERATED);
                    memberRepository.save(heistMembers.get(i));
                }
                break;
        }
    }

    @Override
    public List<MemberDTO> fetchAllMembers() {
        return memberMapper.membersToMemberDTOs(this.getAllMembers());
    }
}
