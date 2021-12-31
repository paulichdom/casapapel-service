import { Skill } from "./Skill";

export interface Member {
    id?: number,
    name: string,
    sex: string,
    email: string,
    skills: Skill[],
    mainSkill?: string,
    status: string
} 