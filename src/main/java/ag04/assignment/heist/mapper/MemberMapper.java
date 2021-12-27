package ag04.assignment.heist.mapper;

import ag04.assignment.heist.domain.Member;
import ag04.assignment.heist.domain.MemberSkill;
import ag04.assignment.heist.domain.Skill;
import ag04.assignment.heist.dto.MemberDTO;
import ag04.assignment.heist.dto.MemberSkillDTO;
import ag04.assignment.heist.exception.BadRequestAlertException;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class MemberMapper {

    private final MemberSkillMapper memberSkillMapper;

    public MemberMapper(MemberSkillMapper memberSkillMapper) {
        this.memberSkillMapper = memberSkillMapper;
    }

    public Member memberDTOToMember(MemberDTO memberDTO) {
        if(memberDTO == null) {
            return null;
        } else {
            Member member = new Member();
            member.setName(memberDTO.getName());
            member.setSex(memberDTO.getSex());
            member.setEmail(memberDTO.getEmail());
            member.setStatus(memberDTO.getStatus());

            Set<MemberSkill> memberSkills = memberSkillMapper.memberSkillDTOsToMemberSkills(memberDTO.getSkills());
            member.setSkills(memberSkills);

            if(memberDTO.getMainSkill()!= null){
                String mainSkillName = memberDTO.getMainSkill();
                Optional<Skill> skillOptional =
                        member.getSkills().stream()
                                .filter(memberSkill -> memberSkill.getSkill().getName().equals(mainSkillName))
                                .findFirst().map(MemberSkill::getSkill);

                if(skillOptional.isPresent()){
                    member.setMainSkill(skillOptional.get());
                } else{
                    throw new BadRequestAlertException("Main skill must reference at least one skill from the list");
                }
            }
            return member;
        }
    }

    public List<MemberDTO> membersToMemberDTOs(List<Member> memberList) {
        return memberList.stream().map(this::memberToMemberDTO).collect(Collectors.toList());
    }

    public MemberDTO memberToMemberDTO (Member member) {
        if(member == null) {
            return null;
        } else {
            MemberDTO memberDTO = new MemberDTO();
            memberDTO.setId(member.getId());
            memberDTO.setName(member.getName());
            memberDTO.setSex(member.getSex().toString());
            memberDTO.setEmail(member.getEmail());
            memberDTO.setStatus(member.getStatus().toString());
            memberDTO.setMainSkill(member.getMainSkill().getName());

            List<MemberSkillDTO> memberSkillDTOList = memberSkillMapper
                    .memberSkillsToMemberSkillDTOs(member.getSkills());

            memberDTO.setSkills(memberSkillDTOList);
            return memberDTO;
        }
    }
}
