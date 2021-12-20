package ag04.assignment.heist.exception.restapiexception;

import ag04.assignment.heist.exception.LowerCaseClassNameResolver;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.annotation.JsonTypeIdResolver;
import lombok.Data;
import org.hibernate.validator.internal.engine.path.PathImpl;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import javax.validation.ConstraintViolation;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Data
@JsonTypeInfo(include = JsonTypeInfo.As.WRAPPER_OBJECT, use = JsonTypeInfo.Id.CUSTOM, property = "exception", visible = true)
@JsonTypeIdResolver(LowerCaseClassNameResolver.class)
public class RestApiException {

    private HttpStatus status;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private LocalDateTime timestamp;
    private String message;
    private String debugMessage;
    private List<RestApiSubException> subErrors;

    private RestApiException() {
        timestamp = LocalDateTime.now();
    }

    public RestApiException(HttpStatus status) {
        this();
        this.status = status;
    }

    public RestApiException(HttpStatus status, String message) {
        this();
        this.status = status;
        this.message = message;
    }

    public RestApiException(HttpStatus status, Throwable ex) {
        this();
        this.status = status;
        this.message = "Unexpected error";
        this.debugMessage = ex.getLocalizedMessage();
    }

    public RestApiException(HttpStatus status, String message, Throwable ex) {
        this();
        this.status = status;
        this.message = message;
        this.debugMessage = ex.getLocalizedMessage();
    }

    private void addSubException(RestApiSubException subException) {
        if (subErrors == null) {
            subErrors = new ArrayList<>();
        }
        subErrors.add(subException);
    }

    private void addValidationException(String object, String field, Object rejectedValue, String message) {
        addSubException(new RestApiValidationException(object, field, rejectedValue, message));
    }

    private void addValidationException(String object, String message) {
        addSubException(new RestApiValidationException(object, message));
    }

    private void addValidationException(FieldError fieldError) {
        this.addValidationException(
                fieldError.getObjectName(),
                fieldError.getField(),
                fieldError.getRejectedValue(),
                fieldError.getDefaultMessage());
    }

    public void addValidationExceptions(List<FieldError> fieldErrors) {
        fieldErrors.forEach(this::addValidationException);
    }

    private void addValidationException(ObjectError objectError) {
        this.addValidationException(
                objectError.getObjectName(),
                objectError.getDefaultMessage());
    }

    public void addValidationException(List<ObjectError> globalErrors) {
        globalErrors.forEach(this::addValidationException);
    }

    /**
     * Utility method for adding error of ConstraintViolation. Usually when a @Validated validation fails.
     *
     * @param cv the ConstraintViolation
     */
    private void addValidationException(ConstraintViolation<?> cv) {
        this.addValidationException(
                cv.getRootBeanClass().getSimpleName(),
                ((PathImpl) cv.getPropertyPath()).getLeafNode().asString(),
                cv.getInvalidValue(),
                cv.getMessage());
    }

    public void addValidationErrors(Set<ConstraintViolation<?>> constraintViolations) {
        constraintViolations.forEach(this::addValidationException);
    }

}
