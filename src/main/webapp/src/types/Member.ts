import { Skill } from "./Skill";

export interface Member {
    name: String,
    sex: String,
    email: String,
    skills: Skill[],
    mainSkill: String,
    status: String
} 