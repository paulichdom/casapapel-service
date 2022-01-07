import { Heist } from "../types/Heist";
import http from "../util/httpCommon";

const HeistURI = {
  FETCH_ALL: "heist/all",
  ADD_NEW_HEIST: "/heist",
  VIEW_HEIST_DETAILS: (heistId: number) => `/heist/${heistId}`,
  VIEW_ELIGIBLE_MEMBERS: (heistId: number) =>
    `/heist/${heistId}/eligible_members`,
  VIEW_HEIST_PARTICIPANTS: (heistid: number) => `/heist/${heistid}/members`,
  VIEW_HEIST_SKILLS: (heistId: number) => `/heist/${heistId}/skills`,
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
}

export default new HeistService();
