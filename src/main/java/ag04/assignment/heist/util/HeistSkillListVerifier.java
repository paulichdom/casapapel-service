package ag04.assignment.heist.util;

import ag04.assignment.heist.dto.HeistSkillDTO;

import java.util.List;
import java.util.stream.Collectors;

public class HeistSkillListVerifier {

    public static boolean heistSkillListHasDoubles(List<HeistSkillDTO> heistSkillDTOs) {
        List<HeistSkillDTO> listWithNameAndLevel = heistSkillDTOs.stream()
                .map(skill -> new HeistSkillDTO(skill.getName(), skill.getLevel()))
                .collect(Collectors.toList());
        List<HeistSkillDTO> distinct = listWithNameAndLevel.stream().distinct().collect(Collectors.toList());
        return listWithNameAndLevel.size() != distinct.size();
    }
}
