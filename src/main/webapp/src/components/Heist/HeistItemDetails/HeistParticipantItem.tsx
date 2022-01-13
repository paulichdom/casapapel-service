import React from "react";
import { List, Image } from "semantic-ui-react";
import { getMemberImage } from "../../../services/ImageService"
import { Member } from "../../../types/Member"

interface PropTypes {
  participant: Member;
}

const HeistParticipantItem = ({ participant }: PropTypes) => {
  const { name } = participant;
  const imageUrl = getMemberImage(name);
  return (
    <List.Item>
      <Image avatar src={imageUrl.href} bordered/>
      <List.Content>
        <List.Header as="h4">{name}</List.Header>
      </List.Content>
    </List.Item>
  );
};

export default HeistParticipantItem;
