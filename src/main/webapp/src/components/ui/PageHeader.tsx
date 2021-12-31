import { Fragment } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Icon,
  Header,
  Divider,
  SemanticCOLORS,
} from "semantic-ui-react";

interface PropTypes {
  title: string | String;
  showButton: boolean;
  buttonTitle?: string;
  buttonColor?: SemanticCOLORS;
  path?: string;
  subtitle?: string;
}

const PageHeader = (props: PropTypes) => {
  const { title, showButton, path, buttonColor, buttonTitle, subtitle } = props;

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
      <Header as="h2" textAlign="left" dividing={!showButton}>
        {title}
        {subtitle && <Header.Subheader>{subtitle}</Header.Subheader>}
      </Header>
      {showButton && <Divider />}
    </Fragment>
  );
};

export default PageHeader;
