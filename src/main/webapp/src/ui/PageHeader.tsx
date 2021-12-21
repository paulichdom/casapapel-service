import { Fragment } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Icon,
  Header,
  Divider,
  SemanticCOLORS,
} from "semantic-ui-react";

interface PropsTypes {
  title: string;
  showButton: boolean;
  buttonTitle: string;
  buttonColor: SemanticCOLORS;
  path: string;
}

const PageHeader = (props: PropsTypes) => {
  const { title, showButton, path, buttonColor, buttonTitle } = props;

  return (
    <Fragment>
      {showButton && (
        <Button
          as={Link}
          to={path}
          color={buttonColor}
          icon
          labelPosition="right"
          floated="right"
        >
          {buttonTitle}
          <Icon name="add" />
        </Button>
      )}
      <Header as="h2" textAlign="left">
        {title}
      </Header>
      <Divider />
    </Fragment>
  );
};

export default PageHeader;
