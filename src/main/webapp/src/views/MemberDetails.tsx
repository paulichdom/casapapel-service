import { useEffect, useState } from "react";
import { useParams } from "react-router";
import MemberItemDetails from "../components/Member/MemberItemDetails";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { viewMemberDetails } from "../store/member/memberThunk";
import { LoadingStatus } from "../types/LoadingStatus";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import http from "../util/httpCommon";

const BACON_IPSUM_URI =
  "https://baconipsum.com/api/?type=all-meat&sentences=4&start-with-lorem=1";

const MemberDetails = () => {
  let { memberId } = useParams();

  const [baconIpsum, setBaconIpsum] = useState<String[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(viewMemberDetails(+memberId!));
    http.get(BACON_IPSUM_URI).then((response) => setBaconIpsum(response.data));
  }, [dispatch, memberId]);

  const { memberDetails, loadingStatus } = useAppSelector(
    (state) => state.member
  );

  if (loadingStatus === LoadingStatus.Loading)
    return <LoadingSpinner content="member details" />;

  return <MemberItemDetails member={memberDetails} aboutText={baconIpsum} />;
};

export default MemberDetails;
