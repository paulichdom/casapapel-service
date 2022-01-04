import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Message } from "semantic-ui-react";
import HeistItemDetails from "../components/Heist/HeistItemDetails";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { viewHeistDetails } from "../store/heist/heistThunk";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { LoadingStatus } from "../types/LoadingStatus";

const HeistDetails = () => {
  let { heistId } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(viewHeistDetails(+heistId!));
  }, [dispatch, heistId]);

  const { heistDetails, loadingStatus } = useAppSelector(
    (state) => state.heist
  );

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

  return <HeistItemDetails heistDetails={heistDetails}/>;
};

export default HeistDetails;
