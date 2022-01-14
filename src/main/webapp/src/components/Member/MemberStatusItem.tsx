import React, { Fragment } from "react";
import { Icon } from "semantic-ui-react";

interface PropTypes {
  memberStatus: string;
}

const MemberStatusItem = ({ memberStatus }: PropTypes) => {
  return (
    <Fragment>
      {memberStatus === "AVAILABLE" && (
        <Icon color="green" name="check circle" />
      )}
      {memberStatus === "INCARCERATED" && (
        <Icon color="red" name="times circle" />
      )}
      {memberStatus === "EXPIRED" && <Icon color="grey" name="minus circle" />}
      {memberStatus === "RETIRED" && <Icon color="orange" name="stop circle" />}
      {memberStatus}
    </Fragment>
  );
};

export default MemberStatusItem;
