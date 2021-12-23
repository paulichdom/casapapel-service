import { FormSkill } from "../types/Skill";

export const skillToSkillDTO = (skill: FormSkill) => {
  return { name: skill.name, level: "*".repeat(skill.level) };
};

export const formSkillsToSkillDTOs = (skills: FormSkill[]) =>
  skills.map((skill) => skillToSkillDTO(skill));
