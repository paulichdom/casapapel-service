import { createAsyncThunk } from "@reduxjs/toolkit";
import MemberService from "../../services/memberService";
import { RestApiException } from "../../types/Exception";
import { handleRequest } from "../../util/RequestHandler";
import { Member } from "../../types/Member";


// GET -> View all members
export const getAllMembers = createAsyncThunk<Member[]>(
  "member/all",
  async () => {
    const response = await MemberService.fetchAll();
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
