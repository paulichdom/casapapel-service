import {
  RestApiException,
  ErrorContainer,
  ErrorMessage,
} from "../types/Exception";
import { ExceptionMessages } from "./ExceptionMessages";

/**
 * Map validation data
 * @param response validation data object returned by the server
 * @returns object with key value pairs -> field name and corresponding message
 */
export const exceptionValidatationMapper = (
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

/**
 * Store error messages
 * @param response object recived from the server
 * @returns error message object containing the corresponding error message
 */
export const exceptionResponseMapper = (
  response: RestApiException
): ErrorMessage => {
  let errorMesage: ErrorMessage = {
    memberAlreadyExists: "",
    doubleSkill: "",
    mainSkillReference: "",
    heistAlreadyExists: "",
    invalidHeistStatus: "",
    heistAlreadyStarted: "",
    membersAlreadyConfirmed: "",
  };

  switch (response.message) {
    case ExceptionMessages.MEMBER_ALREADY_EXISTS:
      errorMesage.memberAlreadyExists = response.message;
      break;
    case ExceptionMessages.BAD_MAIN_SKILL_REFERENCE:
      errorMesage.mainSkillReference = response.message;
      break;
    case ExceptionMessages.DOUBLE_SKILL_NOT_ALLOWED_MEMBER:
      errorMesage.doubleSkill = response.message;
      break;
    case ExceptionMessages.HEIST_ALREADY_EXISTS:
      errorMesage.heistAlreadyExists = response.message;
      break;
    case ExceptionMessages.DOUBLE_SKILL_NOT_ALLOWED_HEIST:
      errorMesage.doubleSkill = response.message;
      break;
    case ExceptionMessages.INVALID_HEIST_STATUS:
      errorMesage.invalidHeistStatus = response.message;
      break;
    case ExceptionMessages.HEIST_ALREADY_STARTED:
      errorMesage.heistAlreadyStarted = response.message;
      break;
    case ExceptionMessages.ELIGIBLE_MEMBERS_ALREADY_CONFIRMED:
      errorMesage.membersAlreadyConfirmed = response.message;
      break;
    default:
      break;
  }
  return errorMesage;
};
