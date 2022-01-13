import React, { SyntheticEvent } from "react";
import { Button, Header, Icon, Label, List, Segment } from "semantic-ui-react";

interface PropTypes {
  selectedMembers: string[];
  removeHandler: (event: SyntheticEvent) => void;
  confirmHandler: () => void;
}

const SelectedMembersItem = (props: PropTypes) => {
  const { selectedMembers, removeHandler, confirmHandler } = props;
  return (
    <>
      {selectedMembers.length > 0 && (
        <Segment padded style={{ borderRadius: "10px" }} textAlign="left">
          <Header sub dividing>
            Selected monsters: {selectedMembers.length}
          </Header>
          <List relaxed>
            {selectedMembers.map((memberName, index) => (
              <List.Item key={index} onClick={removeHandler}>
                <Label basic color="green">
                  <Icon name="check circle" />
                  {memberName}
                  <Icon name="delete" />
                </Label>
              </List.Item>
            ))}
          </List>
          <Button
            color="blue"
            style={{ marginTop: "15px" }}
            fluid
            size="tiny"
            content="Confirm participants"
            onClick={confirmHandler}
          />
        </Segment>
      )}
    </>
  );
};

export default SelectedMembersItem;
