import React from "react";

import { Segment, Header, Icon, Card, Divider } from "semantic-ui-react";

const Home = () => {
  return (
    <Segment basic padded="very" textAlign="center">
      <Icon name="monero" color="red" size="massive" />
      <Header size="huge">MONSTER HEIST</Header>
      <Divider />
      <Header as="h1" content="Personal Heist Management Tool" />
      <Header as="h3" content="Create monsters. Manage heists efficiently." />
      <Card.Group itemsPerRow={3}>
        {/*  <Card image="https://robohash.org/berlin?set=set2" header="Berlin" />
        <Card image="https://robohash.org/rio?set=set2" header="Rio" />
        <Card image="https://robohash.org/oslo?set=set2" header="Oslo" /> */}
      </Card.Group>
    </Segment>
  );
};

export default Home;
