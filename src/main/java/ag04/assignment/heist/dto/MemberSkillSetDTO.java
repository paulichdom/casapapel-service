package ag04.assignment.heist.dto;

import ag04.assignment.heist.validation.OptionalIfOtherIsProvided;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.Valid;
import java.util.List;

@Data
@AllArgsConstructor
@OptionalIfOtherIsProvided(fields = {"skills", "mainSkill"})
public class MemberSkillSetDTO {

    @Valid
    private List<MemberSkillDTO> skills;

    private String mainSkill;
}
