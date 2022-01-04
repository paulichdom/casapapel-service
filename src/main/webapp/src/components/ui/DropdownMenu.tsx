import React from "react";
import { Dropdown, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const DropdownMenu = () => {
  const plusIcon = <Icon name="plus" size="large" inverted />;
  const carretDownIcon = <Icon name="caret down" size="large" inverted />;

  return (
    <Dropdown trigger={plusIcon} icon={carretDownIcon} pointing="top" item>
      <Dropdown.Menu>
        <Dropdown.Item as={NavLink} to="/member/new">
          New Monster
        </Dropdown.Item>
        <Dropdown.Item as={NavLink} to="/heist/new">
          New Heist
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownMenu;
