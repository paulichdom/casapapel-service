import React from "react";

import { Card, Image, Icon } from "semantic-ui-react";

interface PropTypes {
  name: String;
}

const MonsterItem = (props: PropTypes) => {
  const imageUrl = new URL(`/${props.name}`, `https://robohash.org`);
  imageUrl.searchParams.append("set", "set2");
  
  return (
    <Card>
      <Image src={imageUrl.href} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{props.name}</Card.Header>
        <Card.Meta>
          <span className="date">Joined in 2015</span>
        </Card.Meta>
        <Card.Description>
          Matthew is a musician living in Nashville.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="user" />
          22 Friends
        </a>
      </Card.Content>
    </Card>
  );
};

export default MonsterItem;
