import React from "react";
import { Member } from "../../types/Member";
import { Card } from "semantic-ui-react";
import MemberItem from "./MemberItem";

interface PropTypes {
  memberList: Member[]
}

const MemberItemGroup = (props: PropTypes) => {
  const {memberList} = props;

  return (
    <Card.Group itemsPerRow={4}>
      {memberList.map((member) => (
        <MemberItem key={member.name.toString()} member={member} />
      ))}
    </Card.Group>
  );
};

export default MemberItemGroup;
