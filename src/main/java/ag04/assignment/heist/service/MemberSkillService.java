package ag04.assignment.heist.service;

import ag04.assignment.heist.domain.Heist;
import ag04.assignment.heist.domain.MemberSkill;
import ag04.assignment.heist.dto.MemberSkillSetDTO;

public interface MemberSkillService {
    MemberSkill getMemberSkill(Long member_id, Long skill_id);
    void updateMemberSkillSet(Long memberId, MemberSkillSetDTO memberSkillSetDTO);
    void deleteMemberSkill (Long memberId, String skillName);
    MemberSkillSetDTO getMemberSkillSet(Long member_id);
    void levelUpMemberSkills(Heist heist);
}
