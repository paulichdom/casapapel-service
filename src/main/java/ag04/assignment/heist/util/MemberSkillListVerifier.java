package ag04.assignment.heist.util;

import ag04.assignment.heist.domain.MemberSkill;
import ag04.assignment.heist.dto.MemberSkillDTO;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class MemberSkillListVerifier {

    public static List<String> memberSkillListHasDoubles(List<MemberSkillDTO> memberSkillList) {
        List<String> memberSkillNames = buildSkillNamesListFromDTO(memberSkillList);
        return memberSkillNames.stream()
                .filter(name -> Collections.frequency(memberSkillNames, name) > 1)
                .collect(Collectors.toList());
    }

    public static List<String> memberSkillNamesToUpdate(Set<MemberSkill> memberSkillListContained, Set<MemberSkill> memberSkillListForUpdate) {
        List<String> containedList = buildSkillNamesList(memberSkillListContained);
        List<String> namesForUpdate = buildSkillNamesList(memberSkillListForUpdate);
        return namesForUpdate.stream()
                .filter(nonUniqueStringValues(containedList)).collect(Collectors.toList());
    }

    public static List<String> buildSkillNamesListFromDTO(List<MemberSkillDTO> memberSkillDTOList) {
        return memberSkillDTOList.stream().map(MemberSkillDTO::getName).collect(Collectors.toList());
    }

    public static List<String> buildSkillNamesList(Set<MemberSkill> memberSkillList) {
        return memberSkillList.stream().map(skill -> skill.getSkill().getName()).collect(Collectors.toList());
    }

    private static Predicate<String> nonUniqueStringValues (List<String> namesList) {
        return name -> Collections.frequency(namesList, name) >= 1;
    }

}
