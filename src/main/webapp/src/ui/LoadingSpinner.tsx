import React from "react";

import { Dimmer, Loader } from "semantic-ui-react";

interface PropsTypes {
  content?: string;
}

const LoadingSpinner = (props: PropsTypes) => {
  return (
    <Dimmer active inverted>
      <Loader size="large">Loading {props.content || "..."}</Loader>
    </Dimmer>
  );
};

export default LoadingSpinner;
