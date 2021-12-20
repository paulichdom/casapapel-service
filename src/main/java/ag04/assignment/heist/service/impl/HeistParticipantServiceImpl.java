package ag04.assignment.heist.service.impl;

import ag04.assignment.heist.domain.HeistParticipant;
import ag04.assignment.heist.domain.MemberStatus;
import ag04.assignment.heist.repository.HeistParticipantRepository;
import ag04.assignment.heist.service.HeistParticipantService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class HeistParticipantServiceImpl implements HeistParticipantService {

    private final HeistParticipantRepository heistParticipantRepository;

    public HeistParticipantServiceImpl(HeistParticipantRepository heistParticipantRepository) {
        this.heistParticipantRepository = heistParticipantRepository;

    }

    @Override
    public Optional<List<HeistParticipant>> getAllHeistsByParticipantId(Long participantId) {
        return heistParticipantRepository.findAllByMemberId(participantId);
    }

    @Override
    public Optional<Set<HeistParticipant>> getAllParticipantsByHeistId(Long heist_id) {
        return heistParticipantRepository.findAllByHeistId(heist_id);
    }

    public void removeRemainingAvailableMembers(Long heist_id) {
        Optional<Set<HeistParticipant>> remainingParticipants = getAllParticipantsByHeistId(heist_id);

        if(remainingParticipants.isPresent()) {
            for(HeistParticipant heistParticipant : remainingParticipants.get()) {
                if(heistParticipant.getMember().getStatus().equals(MemberStatus.AVAILABLE) ||
                        heistParticipant.getMember().getStatus().equals(MemberStatus.RETIRED)) {
                    heistParticipantRepository.delete(heistParticipant);
                }
            }
        }
    }
}
