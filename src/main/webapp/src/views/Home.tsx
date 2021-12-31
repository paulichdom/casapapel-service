import React from "react";

import { Segment, Header, Icon, Divider, Embed } from "semantic-ui-react";

import image from "../assets/cookiemonster.png";

const Home = () => {
  return (
    <Segment basic padded="very" textAlign="center">
      <Icon name="monero" color="red" size="massive" />
      <Header size="huge">MONSTER HEIST</Header>
      <Divider />
      <Header as="h1" content="Personal Heist Management Tool" />
      <Header as="h3" content="Create monsters. Manage heists efficiently." />
      <Divider hidden />
      <Embed id="ExeEgDe5JQU" source="youtube" placeholder={image} />
    </Segment>
  );
};

export default Home;
