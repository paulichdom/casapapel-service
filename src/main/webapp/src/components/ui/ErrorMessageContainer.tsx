import React from "react";

import { Container, Icon } from "semantic-ui-react";

interface PropsTypes {
  message: string;
}

const ErrorMessageContainer = ({ message }: PropsTypes) => {
  return (
    <Container
      color="red"
      style={{
        color: "#9F3A38",
        margin: "none",
        marginTop: "0.6rem",
        display: "flex",
      }}
    >
      <Icon name="exclamation circle" style={{ color: "#9F3A38" }} />
      {message}
    </Container>
  );
};

export default ErrorMessageContainer;
