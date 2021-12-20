package ag04.assignment.heist.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Setter
@Getter
@NoArgsConstructor
@Entity
public class MemberSkill extends BaseEntity {

    @ManyToOne
    private Member member;

    @ManyToOne
    private Skill skill;

    private Integer level = 1;
}
