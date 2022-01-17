import { combineReducers } from "redux";
import heistSlice from "./heist/heistSlice";
import memberSlice from "./member/memberSlice";

const rootReducer = combineReducers({
    member: memberSlice,
    heist: heistSlice
});

export default rootReducer;