import React from "react";

import { Segment, Header, Icon, Divider, Embed } from "semantic-ui-react";

const Home = () => {
  return (
    <Segment basic padded="very" textAlign="center">
      <Icon name="monero" color="red" size="massive" />
      <Header size="huge">MONSTER HEIST</Header>
      <Divider />
      <Header as="h1" content="Personal Heist Management Tool" />
      <Header as="h3" content="Create monsters. Manage heists efficiently." />
      <Divider hidden/>
      <Embed id="hT7x1NvGf5k" source="youtube"/>
    </Segment>
  );
};

export default Home;
