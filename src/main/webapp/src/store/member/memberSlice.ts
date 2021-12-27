import { createSlice } from "@reduxjs/toolkit";
import { RestApiException } from "../../types/Exception";
import { LoadingStatus } from "../../types/LoadingStatus";
import { Member } from "../../types/Member";
import { getAllMembers, addNewMember, viewMemberDetails } from "./memberThunk";

export interface MemberState {
  memberDetails: Member;
  memberList: Member[];
  exception: RestApiException;
  loadingStatus: LoadingStatus;
}

const initialMemberDetails: Member = {
  id: 0,
  name: "",
  email: "",
  sex: "",
  skills: [],
  mainSkill: "",
  status: "",
};

const initialException: RestApiException = {
  status: '',
  timestamp:"",
  message: "",
  debugMessage: "",
  subErrors: []
}

const initialState: MemberState = {
  memberDetails: initialMemberDetails,
  memberList: [],
  exception: initialException,
  loadingStatus: LoadingStatus.Idle,
};

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    clearException(state) {
      state.exception = initialException;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET -> View all members
      .addCase(getAllMembers.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(getAllMembers.fulfilled, (state, action) => {
        state.loadingStatus = LoadingStatus.Succeeded;
        state.memberList = action.payload;
      })
      .addCase(getAllMembers.rejected, (state) => {
        state.loadingStatus = LoadingStatus.Failed;
      })
      // POST -> Add a new member
      .addCase(addNewMember.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(addNewMember.fulfilled, (state) => {
        state.loadingStatus = LoadingStatus.Succeeded;
      })
      .addCase(addNewMember.rejected, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.Failed;
        if (payload) state.exception = payload;
      })
      // GET -> View member details
      .addCase(viewMemberDetails.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(viewMemberDetails.fulfilled, (state, {payload}) => {
        state.loadingStatus = LoadingStatus.Succeeded;
        state.memberDetails = payload
      })
      .addCase(viewMemberDetails.rejected, (state, {payload}) => {
        state.loadingStatus = LoadingStatus.Failed;
        if (payload) state.exception = payload;
      })
  },
});

export const { clearException } = memberSlice.actions;

export default memberSlice.reducer;
