import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Icon } from "semantic-ui-react";
import { Member } from "../../types/Member";

interface PropTypes {
  member: Member;
}

const MemberItem = (props: PropTypes) => {
  const {name, mainSkill } = props.member;
  const imageUrl = new URL(`/${name}`, `https://robohash.org`);
  imageUrl.searchParams.append("set", "set2");
  
  return (
    <Card raised>
      <Image src={imageUrl.href} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <span className="date">Joined in 2015</span>
        </Card.Meta>
        <Card.Description>
          {`Specialty: ${mainSkill}`}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link to="/">
          <Icon name="user" />
          Skills
        </Link>
      </Card.Content>
    </Card>
  );
};

export default MemberItem;
