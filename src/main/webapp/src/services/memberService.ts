import http from "../util/httpCommon";
import { Member } from "../types/Member";

const MemberURI = {
  FETCH_ALL: "/member/all",
  NEW_MEMBER: "/member",
  VIEW_MEMBER_DETAILS: (memberId: number) => `/member/${memberId}`,
};

class MemberService {
  fetchAll() {
    return http.get(MemberURI.FETCH_ALL);
  }

  addNewMember(newMemberData: Member) {
    return http.post(MemberURI.NEW_MEMBER, newMemberData);
  }

  viewMemberDetails(memberId: number) {
    return http.get(MemberURI.VIEW_MEMBER_DETAILS(memberId));
  }
}

export default new MemberService();
