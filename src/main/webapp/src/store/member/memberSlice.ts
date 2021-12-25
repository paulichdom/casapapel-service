import { createSlice } from "@reduxjs/toolkit";
import { RestApiException } from "../../types/Exception";
import { LoadingStatus } from "../../types/LoadingStatus";
import { Member } from "../../types/Member";
import { getAllMembers, addNewMember } from "./memberThunk";

export interface MemberState {
  memberList: Member[];
  exception: RestApiException | null;
  loadingStatus: LoadingStatus;
}

const initialState: MemberState = {
  memberList: [],
  exception: null,
  loadingStatus: LoadingStatus.Idle,
};

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    clearException(state) {
      state.exception = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(addNewMember.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(addNewMember.fulfilled, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.Succeeded;
        console.log(payload);
      })
      .addCase(addNewMember.rejected, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.Failed;
        if (payload) state.exception = payload;
      });
  },
});

export const { clearException } = memberSlice.actions;

export default memberSlice.reducer;
