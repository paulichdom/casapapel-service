package ag04.assignment.heist.service;

import ag04.assignment.heist.domain.Heist;
import ag04.assignment.heist.dto.*;

import java.util.List;
import java.util.Set;

public interface HeistService {
    Heist getHeistById(Long id);
    Heist createNewHeist(HeistDTO newHeist);
    EligibleMembersDTO getEligibleMembers(Long heist_id);
    void confirmMembersAsHeistParticipants(Long heist_id, HeistParticipantSetDTO heistParticipantDTO);
    void startHeistManually(Long heist_id);
    HeistDTO getHeistDetails(Long heist_id);
    Set<MemberDTO> getAllHeistParticipants(Long heist_id);
    List<HeistSkillDTO> getAllHeistSkills(Long heist_id);
    HeistStatusDTO getHeistStatus(Long heist_id);
    void startHeist (Long heist_id);
    void finishHeist (Long heist_id);
    HeistOutcomeDTO getHeistOutcome(Long heist_id);
}
