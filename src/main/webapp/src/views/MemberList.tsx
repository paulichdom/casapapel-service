import { Fragment, useEffect } from "react";
import MemberItemGroup from "../components/Member/MemberItemGroup";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAllMembers } from "../store/member/memberThunk";
import { LoadingStatus } from "../types/LoadingStatus";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { Button, Divider, Header, Icon, Message } from "semantic-ui-react";
import useToggle from "../util/hooks/useToggle";
import MemberTable from "../components/Member/MemberTable";

const Members = () => {
  const [isViewChanged, setIsViewChanged] = useToggle();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllMembers());
  }, [dispatch]);

  const { memberList, loadingStatus } = useAppSelector((state) => state.member);

  if (loadingStatus === LoadingStatus.Loading)
    return <LoadingSpinner content="Monsters" />;
  if (!memberList) return <Header>No monsters found</Header>;

  return (
    <Fragment>
      <Button
        color="blue"
        icon
        labelPosition="right"
        floated="right"
        onClick={setIsViewChanged}
      >
        Change view
        <Icon name="eye" />
      </Button>

      <Header as="h2" textAlign="left">
        Monsters
      </Header>
      <Divider />
      {isViewChanged ? (
        <MemberTable memberList={memberList} />
      ) : (
        <MemberItemGroup memberList={memberList} />
      )}
      {memberList.length < 1 && (
        <Message
          header="Monster list is Empty"
          content="Click on the plus (+) sign in the navbar to create a new monster."
        />
      )}
    </Fragment>
  );
};

export default Members;
