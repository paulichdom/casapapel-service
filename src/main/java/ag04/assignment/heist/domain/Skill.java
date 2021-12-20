package ag04.assignment.heist.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Skill extends BaseEntity {

    @Column(unique = true)
    private String name;

    public Skill(String name) {
        this.name = name;
    }
}
