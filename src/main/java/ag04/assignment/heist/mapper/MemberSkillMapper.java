package ag04.assignment.heist.mapper;

import ag04.assignment.heist.domain.MemberSkill;
import ag04.assignment.heist.dto.MemberSkillDTO;
import ag04.assignment.heist.exception.DuplicateSkillsEntryException;
import ag04.assignment.heist.service.SkillService;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static ag04.assignment.heist.util.MemberSkillListVerifier.memberSkillListHasDoubles;

@Component
public class MemberSkillMapper {

    private final SkillService skillService;

    public MemberSkillMapper(SkillService skillService) {
        this.skillService = skillService;
    }

    public MemberSkill memberSkillDTOtoMemberSkill(MemberSkillDTO memberSkillDTO) {
        MemberSkill newMemberSkill = new MemberSkill();
        newMemberSkill.setSkill(skillService.addSkill(memberSkillDTO.getName()));
        if(memberSkillDTO.getLevel() != null) newMemberSkill.setLevel(memberSkillDTO.getLevel().trim().length());
        return newMemberSkill;
    }

    public Set<MemberSkill> memberSkillDTOsToMemberSkills(List<MemberSkillDTO> memberSkillDTOList) {
        if(memberSkillDTOList == null) {
            return null;
        } else {
            if(memberSkillListHasDoubles(memberSkillDTOList).size() != 0) {
                throw new DuplicateSkillsEntryException("Duplicate skills in member skill set are not allowed");
            }

            return memberSkillDTOList
                    .stream()
                    .map(this::memberSkillDTOtoMemberSkill)
                    .collect(Collectors.toSet());
        }
    }

    public MemberSkillDTO memberSkillToMemberSkillDto(MemberSkill memberSkill) {
        MemberSkillDTO memberSkillDTO = new MemberSkillDTO();
        memberSkillDTO.setName(memberSkill.getSkill().getName());
        memberSkillDTO.setLevel("*".repeat(memberSkill.getLevel()));
        return memberSkillDTO;
    }

    public List<MemberSkillDTO> memberSkillsToMemberSkillDTOs(Set<MemberSkill> memberSkillSet) {
        if(memberSkillSet == null) {
            return null;
        } else {
            return memberSkillSet.stream()
                    .map(this::memberSkillToMemberSkillDto)
                    .collect(Collectors.toList());
        }
    }
}
