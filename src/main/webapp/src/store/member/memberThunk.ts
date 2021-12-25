import { createAsyncThunk } from "@reduxjs/toolkit";
import MemberService from "../../services/memberService";
import { RestApiException } from "../../types/Exception";
import { handleRequest } from "../../util/RequestHandler";
import { Member } from "../../types/Member";

export const getAllMembers = createAsyncThunk<Member[]>(
  "member/all",
  async () => {
    const response = await MemberService.fetchAll();
    return response.data;
  }
);

export const addNewMember = createAsyncThunk<
  void,
  Member,
  { rejectValue: RestApiException }
>("member/new", async (newMemberData: Member, thunkApi) => {
  return handleRequest(MemberService.addNewMember(newMemberData), thunkApi);
});
