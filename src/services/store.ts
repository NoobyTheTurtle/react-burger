import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import {socketMiddleware} from "./middleware/socket-middleware";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(socketMiddleware())
})

export default store