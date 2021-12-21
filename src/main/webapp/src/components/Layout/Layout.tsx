import React, { Fragment } from "react";
import { Container, Divider } from "semantic-ui-react";
import MainNavigation from "./MainNavigation"

const Dashboard: React.FC = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <Container>
        <Divider section hidden />
        {props.children}
        <Divider section hidden />
      </Container>
    </Fragment>
  );
};

export default Dashboard;