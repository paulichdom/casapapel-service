package ag04.assignment.heist.repository;

import ag04.assignment.heist.domain.Heist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HeistRepository extends JpaRepository<Heist, Long> {
    Optional<Heist> findOneByName(String heistName);
    Optional<Heist> findOneById(Long id);
}
