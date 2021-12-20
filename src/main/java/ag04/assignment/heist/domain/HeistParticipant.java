package ag04.assignment.heist.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class HeistParticipant extends BaseEntity {

    @ManyToOne
    private Heist heist;

    @ManyToOne
    private Member member;
}
