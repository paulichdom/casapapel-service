export interface RestApiException {
  status: string;
  timestamp: string;
  message: string;
  debugMessage: string | null;
  subErrors: RestApiSubException[];
}

export interface RestApiSubException {
  object: string;
  field: string;
  rejectedValue: any;
  message: string;
}

export interface ErrorContainer {
  [key: string]: string;
}

export interface ErrorMessage {
  memberAlreadyExists:string
  doubleSkill: string,
  mainSkillReference: string,
}
