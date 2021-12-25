import { RestApiException, ErrorContainer } from "../types/Exception";

/**
 * Map validation data
 * @param response validation data object returned by the server
 * @returns object with key value pairs -> field name and corresponding message
 */
export const exceptionResponseMapper = (
  response: RestApiException
): ErrorContainer => {
  const fieldMessageValidationMap = new Map();
  response.subErrors.forEach((error) =>
    fieldMessageValidationMap.set(error.field, error.message)
  );

  return Object.fromEntries(fieldMessageValidationMap);
};

/**
 * Filter skill validation messages
 * @param errorMap mapped validation errors
 * @returns array containing only skills validations
 */
export const filterSkillValidationErrors = (errorMap: ErrorContainer) =>
  Object.entries(errorMap)
    .filter((arr) => arr[0].includes("skills"))
    .sort();
