import { Skill } from "./Skill";

export interface Heist {
  id?: number;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  skills: Skill[];
  heistStatus: string;
  description?: string;
}
