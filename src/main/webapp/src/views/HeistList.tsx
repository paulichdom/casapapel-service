import React, { Fragment, useEffect, useState } from "react";
import { Header, Item } from "semantic-ui-react";
import HeistItem from "../components/Heist/HeistItem";
import HeistItemGroup from "../components/Heist/HeistItemGroup";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import PageHeader from "../components/ui/PageHeader";
import { getAllHeists } from "../store/heist/heistThunk";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { LoadingStatus } from "../types/LoadingStatus";
import http from "../util/httpCommon";

const HeistList = () => {
  const [baconIpsum, setBaconIpsum] = useState<String[]>([]);

  const dispatch = useAppDispatch();

  const { heistList, loadingStatus } = useAppSelector((state) => state.heist);

  const BACON_IPSUM_URI =
    `https://baconipsum.com/api/?type=all-meat&paras=${heistList.length}&start-with-lorem=1`;

  useEffect(() => {
    dispatch(getAllHeists());
    http.get(BACON_IPSUM_URI).then((response) => setBaconIpsum(response.data));
  }, [dispatch, BACON_IPSUM_URI]);

  if (loadingStatus === LoadingStatus.Loading)
    return <LoadingSpinner content="Heists" />;
  if (!heistList) return <Header>No heists found</Header>;

  return (
    <Fragment>
      <PageHeader title="Heists" showButton={false} />
      <HeistItemGroup heistList={heistList} description={baconIpsum} /> 
    </Fragment>
  );
};

export default HeistList;
