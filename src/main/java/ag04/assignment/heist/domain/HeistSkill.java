package ag04.assignment.heist.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class HeistSkill extends BaseEntity {

    @ManyToOne
    private Heist heist;

    @ManyToOne
    private Skill skill;

    @Min(1)
    @Max(10)
    private Integer level;

    /**
     * The member's field which indicates how many members are required
     * to have this particular skill
     */
    private Integer members;

    public HeistSkill(Skill skill, Integer level) {
        this.skill = skill;
        this.level = level;
    }
}
