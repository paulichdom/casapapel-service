import {
  Button,
  Modal,
  TransitionablePortal,
  Header,
  Icon,
  TransitionProps,
} from "semantic-ui-react";

import "./ConfirmationPortal.css";

interface PropsTypes {
  isOpen: boolean;
  cancelHandler: () => void;
  confirmHandler: () => void;
  messageDetails: string;
  transition: TransitionProps;
}

const ConfirmationPortal = (props: PropsTypes) => {
  const { isOpen, cancelHandler, confirmHandler, messageDetails, transition } =
    props;

  return (
    <div>
      <TransitionablePortal
        open={isOpen}
        onOpen={() =>
          setTimeout(() => document.body.classList.add("modal-fade-in-p2"), 0)
        }
        transition={transition}
      >
        <Modal
          open={true}
          onClose={(event) => {
            document.body.classList.remove("modal-fade-in-p2");
            cancelHandler();
          }}
        >
          <Header icon="exclamation triangle" content="Are you sure?" />
          <Modal.Content>
            <h4>
              {messageDetails}
            </h4>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="red"
              onClick={() => {
                document.body.classList.remove("modal-fade-in-p2");
                cancelHandler();
              }}
            >
              <Icon name="remove" /> Cancel
            </Button>
            <Button
              color="green"
              onClick={() => {
                document.body.classList.remove("modal-fade-in-p2");
                confirmHandler();
              }}
            >
              <Icon name="checkmark" /> Proceed
            </Button>
          </Modal.Actions>
        </Modal>
      </TransitionablePortal>
    </div>
  );
};

export default ConfirmationPortal;
