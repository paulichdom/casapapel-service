package ag04.assignment.heist.dto;

import ag04.assignment.heist.domain.HeistStatus;
import ag04.assignment.heist.validation.EnumValue;
import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.util.Date;
import java.util.List;

@Data
public class HeistDTO {

    private Long id;

    @NotBlank(message = "{heistdto.name.notblank}")
    private String name;

    @NotBlank(message = "{heistdto.location.notblank}")
    private String location;

    @NotNull(message = "{heistdto.startdate.notnull}")
    private Date startDate;

    @Future(message = "{heistdto.enddate.future}")
    @NotNull(message = "{heistdto.enddate.notnull}")
    private Date endDate;

    @Valid
    @NotEmpty(message = "{heistdto.skills.notempty}")
    private List<HeistSkillDTO> skills;

    @NotNull(message = "{heistdto.heiststatus.notnull}")
    @EnumValue(targetClassType = HeistStatus.class, message = "{heistdto.heiststatus.validenumvalue}")
    private String heistStatus;

    @AssertTrue(message = "{heistdto.isvalidstartdate.asserttrue}")
    private boolean isValidStartDate() {
        return startDate != null && endDate != null && startDate.before(endDate);
    }

    public HeistStatus getHeistStatus() {
        return HeistStatus.valueOf(this.heistStatus);
    }
}
