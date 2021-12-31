import React from "react";
import { Message } from "semantic-ui-react";

interface PropTypes {
  content?: string;
}

const PageNotFound = (props: PropTypes) => {
  return (
    <Message size="huge" warning>
      <Message.Header>404</Message.Header>
      <p>{props.content || "Page Not Found"}</p>
    </Message>
  );
};

export default PageNotFound;
