package ag04.assignment.heist.dto;

import lombok.Data;

@Data
public class HeistOutcomeDTO {

    private String outcome;

    public HeistOutcomeDTO(String outcome) {
        this.outcome = outcome;
    }
}
