import { Skill } from "../types/Skill";

export const skillIsPersisted = (skills: Skill[], name: string): boolean => {
    return skills.filter(skill => skill.name === name).length > 0;  
}