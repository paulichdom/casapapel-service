import React from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";
import { Member } from "../../types/Member";
import { getMemberImage } from "../../services/ImageService";
import MemberStatusItem from "./MemberStatusItem";

interface PropTypes {
  member: Member;
}

const MemberItem = (props: PropTypes) => {
  const { id, name, email, mainSkill, status } = props.member;
  const imageUrl = getMemberImage(name);

  return (
    <Card raised as={Link} to={`/member/${id}`}>
      <Image src={imageUrl.href} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <span className="email">{email}</span>
        </Card.Meta>
        <Card.Description>{`Specialty: ${
          mainSkill ? mainSkill : "None"
        }`}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <MemberStatusItem memberStatus={status} />
      </Card.Content>
    </Card>
  );
};

export default MemberItem;
