package ag04.assignment.heist.repository;

import ag04.assignment.heist.domain.MemberSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberSkillRepository extends JpaRepository<MemberSkill, Long> {
    Optional<MemberSkill> getOneByMemberIdAndSkillId(Long member_id, Long skill_id);
    List<MemberSkill> getAllByMemberId(Long member_Id);
}
