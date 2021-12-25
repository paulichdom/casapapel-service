import http from "../util/httpCommon";
import { Member } from "../types/Member";

const MemberURI = {
  FETCH_ALL: "/member/all",
  NEW_MEMBER: "/member",
  UPDATE_MEMBER_SKILL: (skillId: number) => `/member/${skillId}/skills`
};

class MemberService {
  fetchAll() {
    return http.get(MemberURI.FETCH_ALL);
  }

  addNewMember(newMemberData: Member) {
    return http.post(MemberURI.NEW_MEMBER, newMemberData, );
  }
}

export default new MemberService();
