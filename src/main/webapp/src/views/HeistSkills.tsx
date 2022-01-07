import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import HeistSkillForm from "../components/Heist/HeistSkillForm";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { viewHeistSkills } from "../store/heist/heistThunk";
import { LoadingStatus } from "../types/LoadingStatus";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const HeistSkills = () => {
  let { heistId } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(viewHeistSkills(+heistId!));
  }, [dispatch, heistId]);

  const { heistSkills, loadingStatus } = useAppSelector((state) => state.heist);
  console.log(heistSkills);

  if (loadingStatus === LoadingStatus.Loading)
    return <LoadingSpinner content="heist skills" />;

  return <HeistSkillForm heistSkills={heistSkills} />;
};

export default HeistSkills;
