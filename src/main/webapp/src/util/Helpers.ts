import { Skill } from "../types/Skill";

/**
 * Check if a selected skill is alredy persisted
 * @param skills array to be filtered
 * @param name of the skill to be checked if it is persisted
 * @returns true if skill is persisted
 */
export const skillIsPersisted = (skills: Skill[], name: string): boolean => {
    return skills.filter(skill => skill.name === name).length > 0;  
}