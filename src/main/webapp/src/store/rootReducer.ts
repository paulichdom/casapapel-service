import { combineReducers } from "redux";
import counterSlice from "../features/counter/counterSlice";
import memberSlice from "./member/memberSlice";

const rootReducer = combineReducers({
    counter: counterSlice,
    member: memberSlice
});

export default rootReducer;