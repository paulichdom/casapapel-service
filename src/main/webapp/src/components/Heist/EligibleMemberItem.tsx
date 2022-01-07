import React, { SyntheticEvent } from "react";
import { Icon, List, Image, ListItemProps } from "semantic-ui-react";
import { getMemberImage } from "../../services/ImageService";
import { Member } from "../../types/Member";

import "./EligibleMemberItem.css";

interface PropTypes {
  memberItem: Member;
  clickHandler: (event: SyntheticEvent, data: ListItemProps) => void;
}

const EligibleMemberItem = ({ memberItem, clickHandler }: PropTypes) => {
  const { name } = memberItem;
  const imageUrl = getMemberImage(name);
  return (
    <List.Item className="sortable" onClick={clickHandler}>
      <List.Content floated="right" verticalAlign="middle">
        <Icon name="check" size="large" className="hideIcon" color="green" />
      </List.Content>
      <Image avatar src={imageUrl.href} size="mini" bordered />
      <List.Content>
        <List.Header>{name}</List.Header>
      </List.Content>
    </List.Item>
  );
};

export default EligibleMemberItem;
