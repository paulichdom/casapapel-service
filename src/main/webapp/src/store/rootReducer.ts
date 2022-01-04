import { combineReducers } from "redux";
import counterSlice from "../features/counter/counterSlice";
import heistSlice from "./heist/heistSlice";
import memberSlice from "./member/memberSlice";

const rootReducer = combineReducers({
    counter: counterSlice,
    member: memberSlice,
    heist: heistSlice
});

export default rootReducer;