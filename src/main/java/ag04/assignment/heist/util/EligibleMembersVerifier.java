package ag04.assignment.heist.util;

import ag04.assignment.heist.domain.Member;
import ag04.assignment.heist.domain.MemberSkill;
import ag04.assignment.heist.dto.HeistSkillDTO;
import ag04.assignment.heist.dto.MemberDTO;
import ag04.assignment.heist.dto.MemberSkillDTO;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class EligibleMembersVerifier {

    /**
     * Find eligible members for a heist who conforms to the following rule:
     * At least one of their skills should match the required skill of the heist and
     * should have a level equal or higher than the required skill
     *
     * @param memberDTOs potential members for a heist
     * @param heistSkillDTOs required skills for a heist
     * @return list of eligible members for a heist
     */
    public static Set<MemberDTO> findEligibleMembers(List<MemberDTO> memberDTOs, List<HeistSkillDTO> heistSkillDTOs) {
        Set<MemberDTO> eligibleMembers = new HashSet<>();

        for(MemberDTO member : memberDTOs) {
            List<MemberSkillDTO> memberSkillDTOs = member.getSkills();
            for (MemberSkillDTO memberSkillDTO : memberSkillDTOs) {
                for(HeistSkillDTO heistSkillDTO : heistSkillDTOs) {
                    if(memberSkillDTO.getName().equals(heistSkillDTO.getName()) &&
                            memberSkillDTO.getLevel().length() >= heistSkillDTO.getLevel().length()) {
                        eligibleMembers.add(member);
                    }
                }
            }
        }
        return eligibleMembers;
    }

    /**
     * Find eligible members whose skills meet heist skill requirements
     *
     * @param memberSet members to be verified
     * @param heistSkillDTOList required heist skills
     * @return list of eligible members for a heist
     */
    public static Set<Member> filterUnEligibleMembers(Set<Member> memberSet, List<HeistSkillDTO> heistSkillDTOList) {
        Set<Member> eligibleMembers = new HashSet<>();

        for(Member member : memberSet) {
            Set<MemberSkill> memberSkills = member.getSkills();
            for (MemberSkill memberSkill : memberSkills) {
                for(HeistSkillDTO heistSkillDTO : heistSkillDTOList) {
                    if(memberSkill.getSkill().getName().equals(heistSkillDTO.getName()) &&
                            memberSkill.getLevel() >= heistSkillDTO.getLevel().length()) {
                        eligibleMembers.add(member);
                    }
                }
            }
        }
        return eligibleMembers;
    }
}
