package ag04.assignment.heist.exception;

public class EmailAlreadyUsedException extends BadRequestAlertException {

    public EmailAlreadyUsedException(String message) {
        super(message);
    }
}
