package ag04.assignment.heist.service;

import ag04.assignment.heist.domain.Skill;

public interface SkillService {
    Skill addSkill(String skillName);
    Skill getSkill(String skillName);
}
