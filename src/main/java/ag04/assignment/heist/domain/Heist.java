package ag04.assignment.heist.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@RequiredArgsConstructor
@Entity
public class Heist extends BaseEntity {

    @Column(unique = true)
    private String name;

    private String location;

    private Date startDate;

    private Date endDate;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "heist")
    private Set<HeistSkill> skills;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "heist")
    private Set<HeistParticipant> participants = new HashSet<>();

    @Enumerated(EnumType.STRING)
    private HeistStatus heistStatus = HeistStatus.PLANNING;

    @Enumerated(EnumType.STRING)
    private HeistOutcome heistOutcome;

    public Set<HeistSkill> getSkills() {
        return skills;
    }

    public void setSkills(Set<HeistSkill> skills) {
        this.skills = skills;

        for(HeistSkill skill : skills) {
            skill.setHeist(this);
        }
    }

    public Set<HeistParticipant> getParticipants() {
        return participants;
    }

    public void setParticipants(Set<HeistParticipant> participants) {
        this.participants = participants;

        for(HeistParticipant participant : participants) {
            participant.setHeist(this);
        }
    }
}
