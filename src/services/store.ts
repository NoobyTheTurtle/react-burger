import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import {socketMiddleware} from "./middleware/socket-middleware";
import {
    wsConnectionClose,
    wsConnectionClosed,
    wsConnectionError,
    wsConnectionStart,
    wsConnectionSuccess,
    wsGetMessage
} from "./reducers/orders";

const wsActions = {
    wsConnectionClosed,
    wsConnectionError,
    wsConnectionStart,
    wsConnectionSuccess,
    wsGetMessage,
    wsConnectionClose
}

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(socketMiddleware(wsActions))
})

export default store