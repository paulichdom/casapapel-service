package ag04.assignment.heist.util;

import ag04.assignment.heist.domain.HeistOutcome;
import lombok.Data;

@Data
public class HeistOutcomeSummary {

    private int memberAllotment;

    private HeistOutcome outcome;

    private String repercussion;

    @Override
    public String toString() {
        return "HeistOutcomeSummary\n{" +
                "memberAllotment=" + memberAllotment +
                ", \noutcome=" + outcome +
                ", \nrepercussion='" + repercussion + '\'' +
                '}';
    }
}
