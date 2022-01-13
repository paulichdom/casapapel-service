import React from "react";
import { Placeholder } from "semantic-ui-react";

import "./LinePlaceholder.css"

const LinePlaceholder = () => {
  return (
    <Placeholder >
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder>
  );
};

export default LinePlaceholder;
