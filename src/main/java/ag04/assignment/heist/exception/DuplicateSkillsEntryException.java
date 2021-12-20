package ag04.assignment.heist.exception;

public class DuplicateSkillsEntryException extends BadRequestAlertException {

    public DuplicateSkillsEntryException(String message) {
        super(message);
    }
}
