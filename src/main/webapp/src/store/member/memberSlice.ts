import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RestApiException } from "../../types/Exception";
import { LoadingStatus } from "../../types/LoadingStatus";
import { Member } from "../../types/Member";
import { MemberSkills } from "../../types/Skill";
import {
  getAllMembers,
  addNewMember,
  viewMemberDetails,
  viewMemberSkills,
  deleteMemberSkill,
  updateMemberSkills,
} from "./memberThunk";

export interface MemberState {
  memberSkills: MemberSkills;
  memberDetails: Member;
  memberList: Member[];
  exception: RestApiException;
  loadingStatus: LoadingStatus;
}

const initialMemberSkills: MemberSkills = {
  skills: [],
  mainSkill: "",
};

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
  status: "",
  timestamp: "",
  message: "",
  debugMessage: "",
  subErrors: [],
};

const initialState: MemberState = {
  memberSkills: initialMemberSkills,
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
    clearMemberSkills(state) {
      state.memberSkills = initialMemberSkills;
    },
    removeMemberSkill(state, action: PayloadAction<number>) {
      const { skills } = state.memberSkills;
      state.memberSkills.skills = skills.filter(
        (skill, index) => action.payload !== index
      );
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
        toast.loading("Creating monster...", { toastId: "t01add" });
      })
      .addCase(addNewMember.fulfilled, (state) => {
        state.loadingStatus = LoadingStatus.Succeeded;
        toast.dismiss("t01add");
        toast.success("New monster successfully created");
      })
      .addCase(addNewMember.rejected, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.Failed;
        toast.dismiss("t01add");
        if (payload) state.exception = payload;
      })
      // GET -> View member details
      .addCase(viewMemberDetails.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(viewMemberDetails.fulfilled, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.Succeeded;
        state.memberDetails = payload;
      })
      .addCase(viewMemberDetails.rejected, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.Failed;
        if (payload) state.exception = payload;
      })
      // GET -> View member skills
      .addCase(viewMemberSkills.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(viewMemberSkills.fulfilled, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.Succeeded;
        state.memberSkills = payload;
      })
      .addCase(viewMemberSkills.rejected, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.Failed;
        if (payload) state.exception = payload;
      })
      // DELETE -> delete member skill
      .addCase(deleteMemberSkill.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
        toast.loading("Deleteing skill...", { toastId: "t02delete" });
      })
      .addCase(deleteMemberSkill.fulfilled, (state) => {
        state.loadingStatus = LoadingStatus.Succeeded;
        toast.dismiss("t02delete");
        toast.success("Skill deleted successfully");
      })
      .addCase(deleteMemberSkill.rejected, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.Failed;
        toast.dismiss("t02delete");
        if (payload) state.exception = payload;
      })
      // PUT -> Update member skills
      .addCase(updateMemberSkills.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
        toast.loading("Updating skills...", { toastId: "t03put" });
      })
      .addCase(updateMemberSkills.fulfilled, (state) => {
        state.loadingStatus = LoadingStatus.Succeeded;
        toast.dismiss("t03put");
        toast.success("Skills updated successfully");
      })
      .addCase(updateMemberSkills.rejected, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.Failed;
        toast.dismiss("t03put");
        if (payload) state.exception = payload;
      });
  },
});

export const { clearException, clearMemberSkills, removeMemberSkill } =
  memberSlice.actions;

export default memberSlice.reducer;
