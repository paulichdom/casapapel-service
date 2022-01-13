import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Icon } from "semantic-ui-react";
import { Member } from "../../types/Member";
import { getMemberImage } from "../../services/ImageService";

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
        <Card.Description>{`Specialty: ${mainSkill ? mainSkill : "None"}`}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {status === "AVAILABLE" && <Icon color="green" name="check circle" />}
        {status === "INCARCERATED" && <Icon color="red" name="times circle" />}
        {status === "EXPIRED" && <Icon color="grey" name="minus circle" />}
        {status === "RETIRED" && <Icon color="orange" name="stop circle" />}
        {status}
      </Card.Content>
    </Card>
  );
};

export default MemberItem;
