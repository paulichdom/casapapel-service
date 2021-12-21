import { Fragment, useEffect } from "react";
import MemberItemGroup from "../components/Member/MemberItemGroup";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAllMembers } from "../store/member/memberThunk";
import { LoadingStatus } from "../types/LoadingStatus";
import LoadingSpinner from "../ui/LoadingSpinner";
import PageHeader from "../ui/PageHeader";
import { Header } from "semantic-ui-react";

const Members = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
   dispatch(getAllMembers())
  }, [dispatch])

  const {memberList, loadingStatus} = useAppSelector((state) => state.member);

  if(loadingStatus === LoadingStatus.Loading) return <LoadingSpinner content="Monsters"/>
  if(!memberList) return <Header>No monsters found</Header>
  
  return (
    <Fragment>
      <PageHeader
        title="Monsters"
        showButton={true}
        buttonTitle="New Monster"
        buttonColor="blue"
        path="/member/new"
      />
      <MemberItemGroup memberList={memberList}/>
    </Fragment>
  );
};

export default Members;
