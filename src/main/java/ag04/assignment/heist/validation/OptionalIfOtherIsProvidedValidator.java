package ag04.assignment.heist.validation;

import org.springframework.beans.BeanWrapperImpl;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;
import java.util.Objects;

public class OptionalIfOtherIsProvidedValidator implements
        ConstraintValidator<OptionalIfOtherIsProvided, Object> {

    private String[] fields;

    @Override
    public void initialize(final OptionalIfOtherIsProvided constraintAnnotation) {
        fields = constraintAnnotation.fields();
    }

    @Override
    public boolean isValid(final Object value, final ConstraintValidatorContext context) {
        final BeanWrapperImpl beanWrapper = new BeanWrapperImpl(value);
        return !Arrays.stream(fields).map(beanWrapper::getPropertyValue).allMatch(Objects::isNull);
    }
}
