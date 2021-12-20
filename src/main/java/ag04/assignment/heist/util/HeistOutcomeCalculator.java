package ag04.assignment.heist.util;

import ag04.assignment.heist.domain.Heist;
import ag04.assignment.heist.domain.HeistOutcome;
import ag04.assignment.heist.domain.HeistSkill;

import java.util.Optional;
import java.util.Random;

public class HeistOutcomeCalculator {

    public static final String REPERCUSSION_FAIL_50 = "All members EXPIRED or INCARCERATED";
    public static final String REPERCUSSION_FAIL_50_75 = "2/3 of the members EXPIRED or INCARCERATED";
    public static final String REPERCUSSION_SUCCESS_50_75 = "1/3 of the members EXPIRED or INCARCERATED";
    public static final String REPERCUSSION_SUCCESS_75_100 = "1/3 of the members INCARCERATED";
    public static final String REPERCUSSION_SUCCESS_100 = "-";

    /**
     * Calculates the success or failure of the heist
     * and determines the corresponding repercussion
     * @param memberAllotment is a percentage value for determining the outcome
     * @return heist outcome summary
     */
   public static HeistOutcomeSummary calculateHeistOutcome(int memberAllotment) {
       HeistOutcomeSummary summary = new HeistOutcomeSummary();
       summary.setMemberAllotment(memberAllotment);

       if (memberAllotment < 50) {
           summary.setOutcome(HeistOutcome.FAILED);
           summary.setRepercussion(REPERCUSSION_FAIL_50);
       } else if (memberAllotment < 75) {
           summary.setOutcome(new Random().nextBoolean() ? HeistOutcome.SUCCEEDED : HeistOutcome.FAILED);
           summary.setRepercussion(
                   summary.getOutcome() == HeistOutcome.SUCCEEDED ? REPERCUSSION_SUCCESS_50_75 : REPERCUSSION_FAIL_50_75);
       } else if (memberAllotment < 100) {
           summary.setOutcome(HeistOutcome.SUCCEEDED);
           summary.setRepercussion(REPERCUSSION_SUCCESS_75_100);
       } else if (memberAllotment == 100) {
           summary.setOutcome(HeistOutcome.SUCCEEDED);
           summary.setRepercussion(REPERCUSSION_SUCCESS_100);
       }

       return summary;
   }

    /**
     * Calculates actual member allotment percentage on the heist
     * @param heist object to be referenced
     * @return member allotment percentage
     */
   public static int calculateMembersAllotment(Heist heist) {
        Optional<Integer> requiredMembers = heist.getSkills().stream()
                .map(HeistSkill::getMembers)
                .reduce(Integer::sum);

        int membersAllotment = 0;

        if(requiredMembers.isPresent()) {
            membersAllotment = calculatePercentage(heist.getParticipants().size(), requiredMembers.get());
        }

        return membersAllotment;
    }

    public static int calculatePercentage(Integer actual, Integer required) {
        return actual * 100 / required;
    }
}
