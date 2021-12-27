import { Skill } from "./Skill";

export interface Member {
    id?: number,
    name: String,
    sex: String,
    email: String,
    skills: Skill[],
    mainSkill: String,
    status: String
} 