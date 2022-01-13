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
  updateHeistSkills,
  confirmHeistParticipants,
  viewHeistOutcome,
  startHeistManually,
} from "./heistThunk";
import { RestApiException } from "../../types/Exception";
import { Member } from "../../types/Member";
import { toast } from "react-toastify";
import { Skill } from "../../types/Skill";

export interface HeistState {
  heistOutcome: string;
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
  heistOutcome: "",
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
    clearHeistDetails(state) {
      state.heistDetails = initialHeistDetails;
    },
    clearHeistOutcome(state) {
      state.heistOutcome = "";
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
      // GET -> View heist skills
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
      })
      // PATCH -> Update heist required skills
      .addCase(updateHeistSkills.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
        toast.loading("Updating skills...", { toastId: "t02skillsUpdate" });
      })
      .addCase(updateHeistSkills.fulfilled, (state) => {
        state.loadingStatus = LoadingStatus.Succeeded;
        toast.dismiss("t02skillsUpdate");
        toast.success("Skills updated successfully");
      })
      .addCase(updateHeistSkills.rejected, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.Failed;
        toast.dismiss("t02skillsUpdate");
        if (payload) state.exception = payload;
      })
      // PUT -> Confirm heist participants
      .addCase(confirmHeistParticipants.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
        toast.loading("Confirming participants...", {
          toastId: "t03confirmParticipants",
        });
      })
      .addCase(confirmHeistParticipants.fulfilled, (state) => {
        state.loadingStatus = LoadingStatus.Succeeded;
        toast.dismiss("t03confirmParticipants");
        toast.success("Participants confirmed successfully");
      })
      .addCase(confirmHeistParticipants.rejected, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.Failed;
        toast.dismiss("t03confirmParticipants");
        if (payload) state.exception = payload;
      })
      // GET -> View heist outcome
      .addCase(viewHeistOutcome.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(viewHeistOutcome.fulfilled, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.Succeeded;
        state.heistOutcome = payload.outcome;
      })
      .addCase(viewHeistOutcome.rejected, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.Failed;
        if (payload) state.exception = payload;
      })
      // PUT -> Start heist manually
      .addCase(startHeistManually.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
        toast.loading("Starting heist...", {
          toastId: "t04startHeist",
        });
      })
      .addCase(startHeistManually.fulfilled, (state) => {
        state.loadingStatus = LoadingStatus.Succeeded;
        toast.dismiss("t04startHeist");
        toast.success("Heist successfully started");
      })
      .addCase(startHeistManually.rejected, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.Failed;
        toast.dismiss("t04startHeist");
        if (payload) state.exception = payload;
      });
  },
});

export const {
  clearEligibleMembers,
  clearHeistParticipants,
  clearException,
  clearHeistDetails,
  clearHeistOutcome,
} = heistSlice.actions;

export default heistSlice.reducer;
