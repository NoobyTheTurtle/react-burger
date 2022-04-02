import {combineReducers} from "redux";
import burgerReducer from "./burger";
import authReducer from "./auth";

const rootReducer = combineReducers({
    burger: burgerReducer,
    auth: authReducer
})

export default rootReducer;