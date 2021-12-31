import http from "../util/httpCommon";
import { Member } from "../types/Member";
import { MemberSkills } from "../types/Skill";

const MemberURI = {
  FETCH_ALL: "/member/all",
  ADD_NEW_MEMBER: "/member",
  VIEW_MEMBER_DETAILS: (memberId: number) => `/member/${memberId}`,
  VIEW_MEMBER_SKILLS: (memberId: number) => `/member/${memberId}/skills`,
  DELETE_MEMBER_SKILL: (memberId: number, skillName: string) =>
    `/member/${memberId}/skills/${skillName}`,
  UPDATE_MEMBER_SKILLS: (memberId: number) => `/member/${memberId}/skills`,
};

class MemberService {
  fetchAll() {
    return http.get(MemberURI.FETCH_ALL);
  }

  addNewMember(newMemberData: Member) {
    return http.post(MemberURI.ADD_NEW_MEMBER, newMemberData);
  }

  viewMemberDetails(memberId: number) {
    return http.get(MemberURI.VIEW_MEMBER_DETAILS(memberId));
  }

  viewMemberSkills(memberId: number) {
    return http.get(MemberURI.VIEW_MEMBER_SKILLS(memberId));
  }

  deleteMemberSkill(memberId: number, skillName: string) {
    return http.delete(MemberURI.DELETE_MEMBER_SKILL(memberId, skillName));
  }

  updateMemberSkills(memberId: number, skillSet: MemberSkills) {
    return http.put(MemberURI.UPDATE_MEMBER_SKILLS(memberId), skillSet);
  }
}

export default new MemberService();
