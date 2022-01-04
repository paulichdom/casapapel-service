import React from "react";
import { Item } from "semantic-ui-react";
import { Heist } from "../../types/Heist";
import HeistItem from "./HeistItem";

interface PropTypes {
  heistList: Heist[];
  description: String[];
}

const HeistItemGroup = (props: PropTypes) => {
  const { heistList, description } = props;
  return (
    <Item.Group divided relaxed>
      {heistList.map((heist, index) => (
        <HeistItem
          key={heist.id}
          heist={heist}
          description={description[index]}
        />
      ))}
    </Item.Group>
  );
};

export default HeistItemGroup;
