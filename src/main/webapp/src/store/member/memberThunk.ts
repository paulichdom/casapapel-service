import { createAsyncThunk } from "@reduxjs/toolkit";
import MemberService from "../../services/memberService";
import { RestApiException } from "../../types/Exception";
import { handleRequest } from "../../util/RequestHandler";
import { Member } from "../../types/Member";
import { MemberSkills } from "../../types/Skill";

// GET -> View all members
export const getAllMembers = createAsyncThunk<Member[]>(
  "member/all",
  async () => {
    const response = await MemberService.fetchAllMembers();
    return response.data;
  }
);

// POST -> Add a new member
export const addNewMember = createAsyncThunk<
  void,
  Member,
  { rejectValue: RestApiException }
>("member/new", async (newMemberData: Member, thunkApi) => {
  return handleRequest(MemberService.addNewMember(newMemberData), thunkApi);
});

// GET -> View member details
export const viewMemberDetails = createAsyncThunk<
  Member,
  number,
  { rejectValue: RestApiException }
>("member/details", async (memberId: number, thunkApi) => {
  return handleRequest(MemberService.viewMemberDetails(memberId), thunkApi);
});

// GET -> View member skills
export const viewMemberSkills = createAsyncThunk<
  MemberSkills,
  number,
  { rejectValue: RestApiException }
>("member/skills", async (memberId: number, thunkApi) => {
  return handleRequest(MemberService.viewMemberSkills(memberId), thunkApi);
});

// DELETE -> Delete member skill
export type MemberSkillToDelete = {
  memberId: number;
  skillName: string;
};

export const deleteMemberSkill = createAsyncThunk<
  void,
  MemberSkillToDelete,
  { rejectValue: RestApiException }
>("member/delete/skill", async (data: MemberSkillToDelete, thunkApi) => {
  return handleRequest(
    MemberService.deleteMemberSkill(data.memberId, data.skillName),
    thunkApi
  );
});

// PUT -> Update member skills
export type MemberSkillUpdateData = {
  skillSet: MemberSkills;
  memberId: number;
};

export const updateMemberSkills = createAsyncThunk<
  void,
  MemberSkillUpdateData,
  { rejectValue: RestApiException }
>("member/update/skills", async (data, thunkApi) => {
  return handleRequest(
    MemberService.updateMemberSkills(data.memberId, data.skillSet),
    thunkApi
  );
});
