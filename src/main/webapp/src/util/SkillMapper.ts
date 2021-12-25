import { FormSkill } from "../types/Skill";

export const formSkillToSkill = (skill: FormSkill) => {
  return { name: skill.name, level: "*".repeat(skill.level) };
};

export const formSkillsToSkills = (skills: FormSkill[]) =>
  skills.map((skill) => formSkillToSkill(skill));
