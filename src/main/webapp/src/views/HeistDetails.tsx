import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Message } from "semantic-ui-react";
import HeistItemDetails from "../components/Heist/HeistItemDetails/HeistItemDetails";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { clearHeistParticipants } from "../store/heist/heistSlice";
import {
  viewHeistDetails,
  viewHeistOutcome,
  viewHeistParticipants,
} from "../store/heist/heistThunk";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { LoadingStatus } from "../types/LoadingStatus";

const HeistDetails = () => {
  let { heistId } = useParams();

  const [heistDetailsFetched, setHeistDetailsFetched] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(viewHeistDetails(+heistId!)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        setHeistDetailsFetched(true);
      }
    });
  }, [dispatch, heistId]);

  const { heistDetails, heistParticipants, loadingStatus } = useAppSelector(
    (state) => state.heist
  );

  const { heistStatus } = heistDetails;

  useEffect(() => {
    dispatch(dispatch(clearHeistParticipants()));
    if (heistDetailsFetched && heistStatus !== "PLANNING") {
      dispatch(viewHeistParticipants(+heistId!));
    }
    if (heistDetailsFetched && heistStatus === "FINISHED") {
      dispatch(viewHeistOutcome(+heistId!));
    }
  }, [dispatch, heistId, heistStatus, heistDetailsFetched]);

  if (loadingStatus === LoadingStatus.Loading)
    return <LoadingSpinner content="heist details" />;

  if (!heistDetails)
    return (
      <Message
        icon="search"
        header="Heist details not found"
        content="Could not load heist details"
      />
    );

  return (
    <HeistItemDetails
      heistDetails={heistDetails}
      heistParticipants={heistParticipants}
    />
  );
};

export default HeistDetails;
