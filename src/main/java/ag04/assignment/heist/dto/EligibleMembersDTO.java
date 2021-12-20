package ag04.assignment.heist.dto;

import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class EligibleMembersDTO {

    List<HeistSkillDTO> requiredSkills;

    Set<MemberDTO> eligibleMembers;
}
