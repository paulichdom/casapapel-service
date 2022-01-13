import { createAsyncThunk } from "@reduxjs/toolkit";
import HeistService from "../../services/heistService";
import { RestApiException } from "../../types/Exception";
import { Heist, HeistParticipants } from "../../types/Heist";
import { Member } from "../../types/Member";
import { HeistSkills, Skill } from "../../types/Skill";
import { handleRequest } from "../../util/RequestHandler";

// GET -> View all heists
export const getAllHeists = createAsyncThunk<Heist[]>("heist/all", async () => {
  const response = await HeistService.fetchAllHeists();
  return response.data;
});

// POST -> Add new heist
export const addNewHeist = createAsyncThunk<
  void,
  Heist,
  { rejectValue: RestApiException }
>("heist/new", async (newHeistData: Heist, thunkApi) => {
  return handleRequest(HeistService.addNewHeist(newHeistData), thunkApi);
});

// GET -> View heist details
export const viewHeistDetails = createAsyncThunk<
  Heist,
  number,
  { rejectValue: RestApiException }
>("heist/details", async (heistId: number, thunkApi) => {
  return handleRequest(HeistService.viewHeistDetails(heistId), thunkApi);
});

// GET -> View eligible members
type EligibleMembers = {
  requiredSkills: Skill[];
  eligibleMembers: Member[];
};

export const viewEligibleMembers = createAsyncThunk<
  EligibleMembers,
  number,
  { rejectValue: RestApiException }
>("heist/eligible_members", async (heistId: number, thunkApi) => {
  return handleRequest(HeistService.viewEligibleMembers(heistId), thunkApi);
});

// GET -> View heist participants
export const viewHeistParticipants = createAsyncThunk<
  Member[],
  number,
  { rejectValue: RestApiException }
>("heist/participants", async (heistId: number, thunkApi) => {
  return handleRequest(HeistService.viewHeistParticipants(heistId), thunkApi);
});

// GET -> View heist skills
export const viewHeistSkills = createAsyncThunk<
  Skill[],
  number,
  { rejectValue: RestApiException }
>("heist/skills", async (heistId: number, thunkApi) => {
  return handleRequest(HeistService.viewHeistSkills(heistId), thunkApi);
});

// PATCH -> Update heist required skills
export type HeistSkillUpdateData = {
  heistId: number;
  skills: HeistSkills;
};

export const updateHeistSkills = createAsyncThunk<
  void,
  HeistSkillUpdateData,
  { rejectValue: RestApiException }
>("heist/skills/update", async (data, thunkApi) => {
  return handleRequest(
    HeistService.updateHeistSkills(data.heistId, data.skills),
    thunkApi
  );
});

// PUT -> Confirm heist participants
export type HeistParticipantsData = {
  heistId: number;
  members: HeistParticipants;
};

export const confirmHeistParticipants = createAsyncThunk<
  void,
  HeistParticipantsData,
  { rejectValue: RestApiException }
>("heist/confirm_participants", async (data, thunkApi) => {
  return handleRequest(
    HeistService.confirmHeistParticipants(data.heistId, data.members),
    thunkApi
  );
});

// GET -> View heist outcome
export type HeistOutcome = {
  outcome: string;
};

export const viewHeistOutcome = createAsyncThunk<
  HeistOutcome,
  number,
  { rejectValue: RestApiException }
>("heist/outcome", async (heistId, thunkApi) => {
  return handleRequest(HeistService.viewHeistOutcome(heistId), thunkApi);
});

// PUT -> Start heist manually
export const startHeistManually = createAsyncThunk<
  void,
  number,
  { rejectValue: RestApiException }
>("heist/start", async (heistId, thunkApi) => {
  return handleRequest(HeistService.startHeistManually(heistId), thunkApi);
});
