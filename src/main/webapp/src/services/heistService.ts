import { Heist, HeistParticipants } from "../types/Heist";
import { HeistSkills } from "../types/Skill";
import http from "../util/httpCommon";

const HeistURI = {
  FETCH_ALL: "heist/all",
  ADD_NEW_HEIST: "/heist",
  VIEW_HEIST_DETAILS: (heistId: number) => `/heist/${heistId}`,
  VIEW_ELIGIBLE_MEMBERS: (heistId: number) =>
    `/heist/${heistId}/eligible_members`,
  VIEW_HEIST_PARTICIPANTS: (heistid: number) => `/heist/${heistid}/members`,
  VIEW_HEIST_SKILLS: (heistId: number) => `/heist/${heistId}/skills`,
  UPDATE_HEIST_SKILS: (heistId: number) => `/heist/${heistId}/skills`,
  CONFIRM_HEIST_PARTICIPANTS: (heistId: number) => `/heist/${heistId}/members`,
  VIEW_HEIST_OUTCOME: (heistId: number) => `/heist/${heistId}/outcome`,
  START_HEIST_MANUALLY: (heistId: number) => `heist/${heistId}/start`,
};

class HeistService {
  fetchAllHeists() {
    return http.get(HeistURI.FETCH_ALL);
  }

  addNewHeist(newHeistData: Heist) {
    return http.post(HeistURI.ADD_NEW_HEIST, newHeistData);
  }

  viewHeistDetails(heistId: number) {
    return http.get(HeistURI.VIEW_HEIST_DETAILS(heistId));
  }

  viewEligibleMembers(heistId: number) {
    return http.get(HeistURI.VIEW_ELIGIBLE_MEMBERS(heistId));
  }

  viewHeistParticipants(heistId: number) {
    return http.get(HeistURI.VIEW_HEIST_PARTICIPANTS(heistId));
  }

  viewHeistSkills(heistId: number) {
    return http.get(HeistURI.VIEW_HEIST_SKILLS(heistId));
  }

  updateHeistSkills(heistId: number, skills: HeistSkills) {
    return http.patch(HeistURI.UPDATE_HEIST_SKILS(heistId), skills);
  }

  confirmHeistParticipants(heistId: number, participants: HeistParticipants) {
    return http.put(HeistURI.CONFIRM_HEIST_PARTICIPANTS(heistId), participants);
  }

  viewHeistOutcome(heistId: number) {
    return http.get(HeistURI.VIEW_HEIST_OUTCOME(heistId));
  }
}

export default new HeistService();
