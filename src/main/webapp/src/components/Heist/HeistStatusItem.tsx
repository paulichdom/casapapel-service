import React, { Fragment } from "react";
import { Label } from "semantic-ui-react";

interface PropTypes {
  heistStatus: string;
}

const HeistStatusItem = ({ heistStatus }: PropTypes) => {
  return (
    <Fragment>
      {heistStatus === "READY" && (
        <Label icon="check circle" content={heistStatus} color="green" />
      )}
      {heistStatus === "IN_PROGRESS" && (
        <Label
          icon="clock outline"
          content={heistStatus.replace("_", " ")}
          color="yellow"
        />
      )}
      {heistStatus === "PLANNING" && (
        <Label icon="cogs" content={heistStatus} color="grey" />
      )}
      {heistStatus === "FINISHED" && (
        <Label icon="flag" content={heistStatus} color="blue" />
      )}
    </Fragment>
  );
};

export default HeistStatusItem;
