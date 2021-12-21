import React from "react";

import { Card } from "semantic-ui-react";
import MonsterItem from "./MonsterItem";

const MonsterItemGroup = () => {
  return (
    <Card.Group itemsPerRow={4}>
      <MonsterItem name="Berlin" />
      <MonsterItem name="Rio" />
      <MonsterItem name="Nairobi" />
      <MonsterItem name="Oslo" />
      <MonsterItem name="Berlin" />
      <MonsterItem name="Rio" />
      <MonsterItem name="Nairobi" />
      <MonsterItem name="Oslo" />
    </Card.Group>
  );
};

export default MonsterItemGroup;
