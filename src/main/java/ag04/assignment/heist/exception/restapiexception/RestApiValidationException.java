package ag04.assignment.heist.exception.restapiexception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
public class RestApiValidationException extends RestApiSubException {
    private String object;
    private String field;
    private Object rejectedValue;
    private String message;

    RestApiValidationException(String object, String message) {
        this.object = object;
        this.message = message;
    }
}
