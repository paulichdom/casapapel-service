export class ExceptionMessages {
  static readonly MEMBER_ALREADY_EXISTS =
    "Cannot create member. Member with the same name or email address already exists!";
  static readonly BAD_MAIN_SKILL_REFERENCE =
    "Main skill must reference at least one skill from the list";
  static readonly DOUBLE_SKILL_NOT_ALLOWED_MEMBER =
    "Duplicate skills in member skill set are not allowed";
  static readonly HEIST_ALREADY_EXISTS =
    "Cannot create heist. Heist with same name already exists";
  static readonly DOUBLE_SKILL_NOT_ALLOWED_HEIST =
    "Duplicate skills with same level are not allowed";
  static readonly INVALID_HEIST_STATUS =
    "Cannot confirm participants. Heist status is not 'PLANNING'!";
  static readonly HEIST_ALREADY_STARTED =
    "Cannot update heist skills. Heist has already started";
  static readonly ELIGIBLE_MEMBERS_ALREADY_CONFIRMED =
    "All eligible and available Members have already been confirmed participants of another ongoing heist";
}
