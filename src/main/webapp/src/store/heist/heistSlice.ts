import { createSlice } from "@reduxjs/toolkit";
import { LoadingStatus } from "../../types/LoadingStatus";
import { Heist } from "../../types/Heist";
import { getAllHeists, viewHeistDetails } from "./heistThunk";
import { RestApiException } from "../../types/Exception";

export interface HeistState {
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
  heistDetails: initialHeistDetails,
  heistList: [],
  exception: initialException,
  loadingStatus: LoadingStatus.Idle,
};

export const heistSlice = createSlice({
  name: "heist",
  initialState,
  reducers: {},
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
      });
  },
});

export default heistSlice.reducer;
