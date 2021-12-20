package ag04.assignment.heist.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@Setter
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class PersistenceValidationException extends RuntimeException {

    public PersistenceValidationException(String message) {
        super(message);
    }
}
