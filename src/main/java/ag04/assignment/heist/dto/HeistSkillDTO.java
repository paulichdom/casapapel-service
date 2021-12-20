package ag04.assignment.heist.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;

@Data
@NoArgsConstructor
public class HeistSkillDTO {

    @NotBlank(message = "{heistskilldto.name.notblank}")
    private String name;

    @NotBlank(message = "{heistskilldto.level.notblank}")
    @Pattern(regexp = "^[*]{1,10}$",
            message = "{heistskilldto.level.pattern}")
    private String level;

    @NotNull(message = "{heistskilldto.members.notnull}")
    @Positive(message = "{heistskilldto.members.positive}")
    private Integer members;

    public HeistSkillDTO(String name, String level) {
        this.name = name;
        this.level = level;
    }
}
