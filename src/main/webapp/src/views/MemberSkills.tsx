import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MemberSkillForm from "../components/Member/MemberSkillForm";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { viewMemberSkills } from "../store/member/memberThunk";
import { LoadingStatus } from "../types/LoadingStatus";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const MemberSkills = () => {
  let { memberId } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(viewMemberSkills(+memberId!));
  }, [dispatch, memberId]);

  const { memberSkills, loadingStatus } = useAppSelector((state) => state.member);

  if(loadingStatus === LoadingStatus.Loading || !memberSkills) return <LoadingSpinner content="skills" />

  return <MemberSkillForm memberSkills={memberSkills} />;
};

export default MemberSkills;
