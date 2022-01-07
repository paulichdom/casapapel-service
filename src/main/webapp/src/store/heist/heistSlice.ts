import { createSlice } from "@reduxjs/toolkit";
import { LoadingStatus } from "../../types/LoadingStatus";
import { Heist } from "../../types/Heist";
import {
  getAllHeists,
  viewHeistDetails,
  viewEligibleMembers,
  viewHeistParticipants,
  addNewHeist,
  viewHeistSkills,
} from "./heistThunk";
import { RestApiException } from "../../types/Exception";
import { Member } from "../../types/Member";
import { toast } from "react-toastify";
import { Skill } from "../../types/Skill";

export interface HeistState {
  heistSkills: Skill[];
  heistParticipants: Member[];
  eligibleMembers: Member[];
  heistDetails: Heist;
  heistList: Heist[];
  exception: RestApiException;
  loadingStatus: LoadingStatus;
}

const initialHeistDetails: Heist = {
  id: 0,
  name: "",
  location: "",
  skills: [],
  startDate: "",
  endDate: "",
  heistStatus: "",
};

const initialException: RestApiException = {
  status: "",
  timestamp: "",
  message: "",
  debugMessage: "",
  subErrors: [],
};

const initialState: HeistState = {
  heistSkills: [],
  heistParticipants: [],
  eligibleMembers: [],
  heistDetails: initialHeistDetails,
  heistList: [],
  exception: initialException,
  loadingStatus: LoadingStatus.Idle,
};

export const heistSlice = createSlice({
  name: "heist",
  initialState,
  reducers: {
    clearEligibleMembers(state) {
      state.eligibleMembers = [];
    },
    clearHeistParticipants(state) {
      state.heistParticipants = [];
    },
    clearException(state) {
      state.exception = initialException;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET -> View all heists
      .addCase(getAllHeists.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(getAllHeists.fulfilled, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.Succeeded;
        state.heistList = payload;
      })
      .addCase(getAllHeists.rejected, (state) => {
        state.loadingStatus = LoadingStatus.Failed;
      })
      // POST -> Add new heist
      .addCase(addNewHeist.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
        toast.loading("Adding new heist...", { toastId: "t01heistAdd" });
      })
      .addCase(addNewHeist.fulfilled, (state) => {
        state.loadingStatus = LoadingStatus.Succeeded;
        toast.dismiss("t01heistAdd");
        toast.success("New heist successfully added");
      })
      .addCase(addNewHeist.rejected, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.Failed;
        toast.dismiss("t01heistAdd");
        if (payload) state.exception = payload;
      })
      // GET -> View heist details
      .addCase(viewHeistDetails.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(viewHeistDetails.fulfilled, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.Succeeded;
        state.heistDetails = payload;
      })
      .addCase(viewHeistDetails.rejected, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.Failed;
        if (payload) state.exception = payload;
      })
      // GET -> View eligible members
      .addCase(viewEligibleMembers.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(viewEligibleMembers.fulfilled, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.Succeeded;
        state.eligibleMembers = payload.eligibleMembers;
      })
      .addCase(viewEligibleMembers.rejected, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.Failed;
        if (payload) state.exception = payload;
      })
      // GET -> View heist participants
      .addCase(viewHeistParticipants.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(viewHeistParticipants.fulfilled, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.Succeeded;
        state.heistParticipants = payload;
      })
      .addCase(viewHeistParticipants.rejected, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.Failed;
        if (payload) state.exception = payload;
      })
      // GET -> View heist participants
      .addCase(viewHeistSkills.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(viewHeistSkills.fulfilled, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.Succeeded;
        state.heistSkills = payload;
      })
      .addCase(viewHeistSkills.rejected, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.Failed;
        if (payload) state.exception = payload;
      });
  },
});

export const { clearEligibleMembers, clearHeistParticipants, clearException } =
  heistSlice.actions;

export default heistSlice.reducer;
