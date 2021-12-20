package ag04.assignment.heist.repository;

import ag04.assignment.heist.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findMemberById(Long id);
    Optional<Member> findOneByEmail(String email);
    Optional<Member> findOneByName(String name);
}
