import { createSlice } from "@reduxjs/toolkit";
import { LoadingStatus } from "../../types/LoadingStatus";
import { Member } from "../../types/Member";
import { getAllMembers } from "./memberThunk";

export interface MemberState {
  memberList: Member[];
  loadingStatus: LoadingStatus;
}

const initialState: MemberState = {
  memberList: [],
  loadingStatus: LoadingStatus.Idle,
};

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMembers.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(getAllMembers.fulfilled, (state, action) => {
        state.memberList = action.payload;
        state.loadingStatus = LoadingStatus.Succeeded;
      })
      .addCase(getAllMembers.rejected, (state) => {
        state.loadingStatus = LoadingStatus.Failed;
      });
  },
});

export default memberSlice.reducer
