package ag04.assignment.heist.dto;

import ag04.assignment.heist.domain.MemberSex;
import ag04.assignment.heist.domain.MemberStatus;
import ag04.assignment.heist.validation.EnumValue;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class MemberDTO {

    @NotBlank(message = "{memberdto.name.notblank}")
    private String name;

    @NotNull(message = "{memberdto.sex.notnull}")
    @EnumValue(targetClassType = MemberSex.class, message = "{memberdto.sex.validenumvalue}")
    private String sex;

    @NotBlank(message = "{memberdto.email.notblank}")
    @Email(message = "{memberdto.email.email}")
    private String email;

    @Valid
    @NotEmpty(message = "{memberdto.skills.notempty}")
    private List<MemberSkillDTO> skills;

    private String mainSkill;

    @NotNull(message = "{memberdto.status.notnull}")
    @EnumValue(targetClassType = MemberStatus.class, message = "{memberdto.status.validenumvalue}")
    private String status;

    public MemberSex getSex() {
        return MemberSex.valueOf(this.sex);
    }

    public MemberStatus getStatus() {
        return MemberStatus.valueOf(this.status);
    }
}
