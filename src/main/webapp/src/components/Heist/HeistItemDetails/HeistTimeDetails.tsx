import { DateTime } from "luxon";
import React from "react";
import { Icon, Label, List, SemanticCOLORS } from "semantic-ui-react";

interface PropTypes {
  heistTimeDetails: DateTime;
  color?: SemanticCOLORS
}

const HeistTimeDetails = ({ heistTimeDetails, color }: PropTypes) => {
  return (
    <List relaxed>
      <List.Item>
        <Label color={color} horizontal>
          Start date
        </Label>
        {heistTimeDetails.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
      </List.Item>
      <List.Item>
        <Icon color="black" name="clock outline" />
        {heistTimeDetails.toLocaleString(DateTime.TIME_24_WITH_SECONDS)}
      </List.Item>
    </List>
  );
};

export default HeistTimeDetails;
