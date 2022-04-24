import {combineReducers} from "redux";
import burgerReducer from "./burger";
import authReducer from "./auth";
import ordersReducer from "./orders";

const rootReducer = combineReducers({
    burger: burgerReducer,
    auth: authReducer,
    orders: ordersReducer
})

export default rootReducer;