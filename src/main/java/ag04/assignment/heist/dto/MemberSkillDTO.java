package ag04.assignment.heist.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class MemberSkillDTO {

    @NotBlank(message = "{memberskilldto.name.notblank}")
    private String name;

    @Pattern(regexp = "^[*]{1,10}$",
            message = "{memberskilldto.level.pattern}")
    private String level;
}
