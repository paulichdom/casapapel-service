export interface Skill {
    name: string,
    level: string
    members?: number
}

export interface FormSkill {
    name: string,
    level: number
}

export interface MemberSkills {
    skills: Skill[],
    mainSkill?: string
}