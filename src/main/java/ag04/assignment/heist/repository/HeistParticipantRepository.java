package ag04.assignment.heist.repository;

import ag04.assignment.heist.domain.HeistParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface HeistParticipantRepository extends JpaRepository<HeistParticipant, Long> {
    Optional<List<HeistParticipant>> findAllByMemberId(Long id);
    Optional<Set<HeistParticipant>> findAllByHeistId(Long id);
}
