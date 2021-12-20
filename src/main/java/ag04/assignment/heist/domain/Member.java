package ag04.assignment.heist.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Setter
@Getter
@RequiredArgsConstructor
@Entity
public class Member extends BaseEntity {

    private String name;

    @Enumerated(EnumType.STRING)
    private MemberSex sex;

    @Column(unique = true)
    private String email;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "member")
    private Set<MemberSkill> skills = new HashSet<>();

    @ManyToOne
    private Skill mainSkill;

    @Enumerated(EnumType.STRING)
    private MemberStatus status;

    public Set<MemberSkill> getSkills() {
        return skills;
    }

    public void setSkills(Set<MemberSkill> skills) {
        this.skills = skills;

        for(MemberSkill skill : skills) {
            skill.setMember(this);
        }
    }
}
