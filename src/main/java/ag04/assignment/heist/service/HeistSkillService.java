package ag04.assignment.heist.service;

import ag04.assignment.heist.dto.HeistSkillSetDTO;

public interface HeistSkillService {

    void updateHeistSkillSet(Long heist_id, HeistSkillSetDTO heistSkillSetDTO);
}
