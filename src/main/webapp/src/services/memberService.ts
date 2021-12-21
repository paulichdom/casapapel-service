import http from "../util/httpCommon"

const MemberURI = {
    FETCH_ALL: "/member/all"
}

class MemberService {
    fetchAll() {
        return http.get(MemberURI.FETCH_ALL)
    }
}

export default new MemberService();