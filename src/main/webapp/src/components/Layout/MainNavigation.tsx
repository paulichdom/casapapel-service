import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import DropdownMenu from "../ui/DropdownMenu";

import {
  Segment,
  Menu,
  Container,
  Header,
  Icon,
  Image,
  Search,
  MenuItem,
} from "semantic-ui-react";

const MainNavigation = () => {
  const userNavigation = (
    <Fragment>
      <Menu.Item as={NavLink} to="/" style={{ borderBottom: "none" }}>
        <Icon name="optin monster" color="teal" size="huge" inverted />
      </Menu.Item>
      <MenuItem>
        <Search />
      </MenuItem>
      <MenuItem as={NavLink} to="/member/all">
        <Header inverted>Monsters</Header>
      </MenuItem>
      <MenuItem>
        <Header inverted>Heists</Header>
      </MenuItem>
      <Menu.Menu position="right">
        <Menu.Item>
          <Icon name="bell outline" size="large" inverted />
        </Menu.Item>
        <DropdownMenu />
        <Menu.Item>
          <Image
            src="https://robohash.org/zliavatar?bgset=bg1"
            avatar
            size="mini"
          />
          <Icon name="caret down" size="large" inverted />
        </Menu.Item>
      </Menu.Menu>
    </Fragment>
  );

  return (
    <Segment
      inverted
      vertical
      textAlign="center"
      style={{ backgroundColor: "#051e34" }}
    >
      <Menu borderless size="large" secondary>
        <Container style={{ width: "90%" }}>{userNavigation}</Container>
      </Menu>
    </Segment>
  );
};

export default MainNavigation;
