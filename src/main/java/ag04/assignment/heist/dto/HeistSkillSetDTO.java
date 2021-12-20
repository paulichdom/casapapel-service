package ag04.assignment.heist.dto;

import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Data
public class HeistSkillSetDTO {

    @Valid
    @NotEmpty(message = "{heistskillsetdto.skills.notempty}")
    private List<HeistSkillDTO> skills;
}
