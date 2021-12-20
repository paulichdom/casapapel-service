package ag04.assignment.heist.service;

import ag04.assignment.heist.domain.HeistParticipant;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface HeistParticipantService {
    Optional<List<HeistParticipant>> getAllHeistsByParticipantId(Long participantId);
    Optional<Set<HeistParticipant>> getAllParticipantsByHeistId(Long heist_id);
    void removeRemainingAvailableMembers(Long heist_id);
}
