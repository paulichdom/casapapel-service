import { createAsyncThunk } from "@reduxjs/toolkit";
import HeistService from "../../services/heistService";
import { RestApiException } from "../../types/Exception";
import { Heist } from "../../types/Heist";
import { handleRequest } from "../../util/RequestHandler";

// GET -> View all heists
export const getAllHeists = createAsyncThunk<Heist[]>("heist/all", async () => {
  const response = await HeistService.fetchAllHeists();
  return response.data;
});

// GET -> View heist details
export const viewHeistDetails = createAsyncThunk<
  Heist,
  number,
  { rejectValue: RestApiException }
>("heist/details", async (heistId: number, thunkApi) => {
  return handleRequest(HeistService.viewHeistDetails(heistId), thunkApi);
});
