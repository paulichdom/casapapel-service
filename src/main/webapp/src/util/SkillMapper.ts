import { FormSkill, Skill } from "../types/Skill";

export const formSkillToSkill = (skill: FormSkill): Skill => {
  return { name: skill.name, level: "*".repeat(skill.level) };
};

export const formSkillsToSkills = (skills: FormSkill[]) =>
  skills.map((skill) => formSkillToSkill(skill));

export const skillToFormSkill = (skill: Skill): FormSkill => {
  return { name: skill.name, level: skill.level.length };
};

export const skillsToFormSkills = (skills: Skill[]): FormSkill[] => {
  return skills.map((skill) => skillToFormSkill(skill));
};
