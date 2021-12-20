package ag04.assignment.heist.mapper;

import ag04.assignment.heist.domain.HeistSkill;
import ag04.assignment.heist.dto.HeistSkillDTO;
import ag04.assignment.heist.exception.DuplicateSkillsEntryException;
import ag04.assignment.heist.service.SkillService;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static ag04.assignment.heist.util.HeistSkillListVerifier.heistSkillListHasDoubles;

@Component
public class HeistSkillMapper {

    private final SkillService skillService;

    public HeistSkillMapper(SkillService skillService) {
        this.skillService = skillService;
    }

    public HeistSkill heistSkillDTOtoHeistSkill(HeistSkillDTO heistSkillDTO) {
        HeistSkill newHeistSkill = new HeistSkill();
        newHeistSkill.setSkill(skillService.addSkill(heistSkillDTO.getName()));
        newHeistSkill.setLevel(heistSkillDTO.getLevel().trim().length());
        newHeistSkill.setMembers(heistSkillDTO.getMembers());
        return newHeistSkill;
    }

    public Set<HeistSkill> heistSkillDTOsToHeistSkills(List<HeistSkillDTO> heistSkillDTOList) {
        if(heistSkillDTOList == null) {
            return null;
        } else {
            if(heistSkillListHasDoubles(heistSkillDTOList)) {
                throw new DuplicateSkillsEntryException("Duplicate skills with same level are not allowed");
            }

            return heistSkillDTOList
                    .stream()
                    .map(this::heistSkillDTOtoHeistSkill)
                    .collect(Collectors.toSet());
        }
    }

    private HeistSkillDTO heistSkillToHeistSkillDto(HeistSkill heistSkill) {
        HeistSkillDTO heistSkillDTO = new HeistSkillDTO();
        heistSkillDTO.setName(heistSkill.getSkill().getName());
        heistSkillDTO.setLevel("*".repeat(heistSkill.getLevel()));
        heistSkillDTO.setMembers(heistSkill.getMembers());
        return heistSkillDTO;
    }

    public List<HeistSkillDTO> heistSkillsToHeistSkillDTOs(Set<HeistSkill> heistSkills) {
        if(heistSkills == null) {
            return null;
        } else {
            return heistSkills.stream()
                    .map(this::heistSkillToHeistSkillDto)
                    .collect(Collectors.toList());
        }
    }
}
