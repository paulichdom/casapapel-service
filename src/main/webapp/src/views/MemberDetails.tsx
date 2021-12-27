import { Fragment, useEffect } from "react";
import { useParams } from "react-router";
import MemberItemDetails from "../components/Member/MemberItemDetails";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { viewMemberDetails } from "../store/member/memberThunk";

const MemberDetails = () => {
  let { memberId } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(viewMemberDetails(+memberId!));
  }, [dispatch, memberId]);

  const { memberDetails } = useAppSelector((state) => state.member);

  return (
    <Fragment>
      <MemberItemDetails member={memberDetails} />
    </Fragment>
  );
};

export default MemberDetails;
