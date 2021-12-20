package ag04.assignment.heist.service;

import ag04.assignment.heist.domain.Member;
import ag04.assignment.heist.dto.MemberDTO;
import ag04.assignment.heist.util.HeistOutcomeSummary;

import java.util.List;

public interface MemberService {
    List<Member> getAllMembers();
    Member getMemberById(Long id);
    Member getMemberByName(String memberName);
    Member createNewMember(MemberDTO newMember);
    MemberDTO getMemberDetails(Long member_id);
    void updateMemberStatusByHeistOutcome(Long heist_id, HeistOutcomeSummary summary);
}
