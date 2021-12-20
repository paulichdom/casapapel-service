package ag04.assignment.heist.service.impl;

import ag04.assignment.heist.domain.*;
import ag04.assignment.heist.dto.MemberSkillSetDTO;
import ag04.assignment.heist.exception.BadRequestAlertException;
import ag04.assignment.heist.mapper.MemberSkillMapper;
import ag04.assignment.heist.repository.MemberSkillRepository;
import ag04.assignment.heist.service.MemberService;
import ag04.assignment.heist.service.MemberSkillService;
import ag04.assignment.heist.service.SkillService;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static ag04.assignment.heist.util.MemberSkillListVerifier.memberSkillNamesToUpdate;

@Service
public class MemberSkillServiceImpl implements MemberSkillService {

    private final MemberSkillRepository memberSkillRepository;
    private final MemberService memberService;
    private final SkillService skillService;
    private final MemberSkillMapper memberSkillMapper;

    public MemberSkillServiceImpl(MemberSkillRepository memberSkillRepository, MemberService memberService, SkillService skillService, MemberSkillMapper memberSkillMapper) {
        this.memberSkillRepository = memberSkillRepository;
        this.memberService = memberService;
        this.skillService = skillService;
        this.memberSkillMapper = memberSkillMapper;
    }

    @Override
    public MemberSkill getMemberSkill(Long member_id, Long skill_id) {
        return memberSkillRepository.getOneByMemberIdAndSkillId(member_id, skill_id).orElseThrow(() ->
                new EntityNotFoundException("Resource not found. MemberSkill does not exist")
        );
    }

    public void updateMemberSkill(Long memberId, String skillName, int newSkillLevel) {
        MemberSkill containedSkill = this.getMemberSkill(memberId, skillService.getSkill(skillName).getId());
        containedSkill.setLevel(newSkillLevel);
        memberSkillRepository.save(containedSkill);
    }

    @Transactional
    public void deleteMemberSkill (Long memberId, String skillName) {
        memberSkillRepository.delete(this.getMemberSkill(
                memberService.getMemberById(memberId).getId(), skillService.getSkill(skillName).getId()));
    }

    @Transactional
    public void updateMemberSkillSet(Long memberId, MemberSkillSetDTO memberSkillSetDTO){
        Member memberToUpdate = memberService.getMemberById(memberId);

        if(memberSkillSetDTO.getSkills() != null) {
        // Get two lists to compare
        Set<MemberSkill> skillSetForUpdate = memberSkillMapper.memberSkillDTOsToMemberSkills(memberSkillSetDTO.getSkills());
        Set<MemberSkill> containedSkills = memberToUpdate.getSkills();

        // Filter skills for update
        List<String> skillsForUpdate = memberSkillNamesToUpdate(containedSkills, skillSetForUpdate);
        Set<MemberSkill> memberSkillsForUpdate = skillSetForUpdate.stream()
                .filter(skill -> Collections.frequency(skillsForUpdate, skill.getSkill().getName()) >= 1)
                .collect(Collectors.toSet());

        // Update skills
        for(MemberSkill memberSkill : memberSkillsForUpdate) {
            this.updateMemberSkill(memberToUpdate.getId(), memberSkill.getSkill().getName(), memberSkill.getLevel());
        }

        // Filter new skills and save them
        Set<MemberSkill> newMemberSkills = skillSetForUpdate.stream()
                .filter(skill -> Collections.frequency(skillsForUpdate, skill.getSkill().getName()) < 1)
                .collect(Collectors.toSet());

        memberToUpdate.setSkills(newMemberSkills);
        }

        // Check if the main skill references one of the skills from the last updated list
        if (memberSkillSetDTO.getMainSkill() != null) {
            // Get last updated member skill list
            List<MemberSkill> updatedMemberSkillList = memberSkillRepository.getAllByMemberId(memberId);
            String mainSkillName = memberSkillSetDTO.getMainSkill();
            Optional<Skill> skillOptional =
                    updatedMemberSkillList.stream()
                            .filter(memberSkill -> memberSkill.getSkill().getName().equals(mainSkillName))
                            .findFirst().map(MemberSkill::getSkill);
            if (skillOptional.isPresent()) {
                memberToUpdate.setMainSkill(skillOptional.get());
            } else {
                throw new BadRequestAlertException("Main skill must reference at least one skill from the list");
            }
        }
    }

    public MemberSkillSetDTO getMemberSkillSet(Long member_id) {
        Member member = memberService.getMemberById(member_id);
        return new MemberSkillSetDTO(
                memberSkillMapper.memberSkillsToMemberSkillDTOs(member.getSkills()),
                member.getMainSkill().getName()
        );
    }

    public void levelUpMemberSkills(Heist heist) {
        List<String> heistSkillNames = heist.getSkills().stream()
                .map(skill -> skill.getSkill().getName())
                .collect(Collectors.toList());

        for(HeistParticipant heistParticipant : heist.getParticipants()) {
            Set<MemberSkill> skillsToImprove = heistParticipant.getMember().getSkills().stream()
                    .filter(skill ->
                            Collections.frequency(heistSkillNames, skill.getSkill().getName()) > 1 &&
                                    skill.getLevel() < 10)
                    .collect(Collectors.toSet());

            if(!skillsToImprove.isEmpty()) {
                for(MemberSkill memberSkill : skillsToImprove) {
                    this.increaseMemberSkillLevel(memberSkill);
                }
            }
        }
    }

    public void increaseMemberSkillLevel(MemberSkill memberSkill) {
        Integer currentLevel = memberSkill.getLevel();
        if(currentLevel < 10) {
            memberSkill.setLevel(currentLevel + 1);
            memberSkillRepository.save(memberSkill);
        }
    }
}
