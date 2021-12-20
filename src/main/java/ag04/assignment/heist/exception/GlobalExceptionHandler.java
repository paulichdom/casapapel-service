package ag04.assignment.heist.exception;

import ag04.assignment.heist.exception.restapiexception.RestApiException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.persistence.EntityNotFoundException;

@Order(Ordered.HIGHEST_PRECEDENCE)
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Object> handleEntityNotFoundException(final Exception exception) {
        return buildResponseEntity(new RestApiException(HttpStatus.NOT_FOUND, "Resource not found", exception)
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGenericException(final Exception exception) {
        return buildResponseEntity(new RestApiException(
                HttpStatus.INTERNAL_SERVER_ERROR, "Oops! There's been an internal server error", exception)
        );
    }

    @ExceptionHandler(BadRequestAlertException.class)
    public ResponseEntity<Object> handleBadRequestAlertException(final Exception exception) {
        return buildResponseEntity(new RestApiException(HttpStatus.BAD_REQUEST, exception.getMessage(), exception)
        );
    }

    @ExceptionHandler(MethodNotAllowedException.class)
    public ResponseEntity<Object> handleMethodNotAllowedException(final Exception exception) {
        return buildResponseEntity(new RestApiException(HttpStatus.METHOD_NOT_ALLOWED, exception.getMessage(), exception)
        );
    }

    @ExceptionHandler(EmailAlreadyUsedException.class)
    public ResponseEntity<Object> handleEmailAlreadyUsedException(final Exception exception) {
        return buildResponseEntity(new RestApiException(HttpStatus.BAD_REQUEST, exception.getMessage(), exception)
        );
    }

    @ExceptionHandler(DuplicateSkillsEntryException.class)
    public ResponseEntity<Object> handleDuplicateSkillsEntryException(final Exception exception) {
        return buildResponseEntity(new RestApiException(HttpStatus.BAD_REQUEST, exception.getMessage(), exception)
        );
    }

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(
            HttpMessageNotReadableException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        String error = "Malformed JSON request";
        return buildResponseEntity(new RestApiException(HttpStatus.BAD_REQUEST, error, ex));
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        RestApiException apiException = new RestApiException(HttpStatus.BAD_REQUEST);
        apiException.setMessage("Validation exception");
        apiException.addValidationExceptions(ex.getBindingResult().getFieldErrors());
        apiException.addValidationException(ex.getBindingResult().getGlobalErrors());
        return buildResponseEntity(apiException);
    }

    private ResponseEntity<Object> buildResponseEntity(RestApiException restApiException) {
        return new ResponseEntity<>(restApiException, restApiException.getStatus());
    }
}
