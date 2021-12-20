package ag04.assignment.heist.repository;

import ag04.assignment.heist.domain.HeistSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HeistSkillRepository extends JpaRepository<HeistSkill, Long> {
    Optional<HeistSkill> findByHeistIdAndSkillIdAndLevel(Long heist_id, Long skill_id, Integer level);

}
