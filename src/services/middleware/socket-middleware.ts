import type {Action, Middleware, MiddlewareAPI} from 'redux';
import type {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "../types";

type TWsActions = {
    wsConnectionClosed: ActionCreatorWithoutPayload,
    wsConnectionError: ActionCreatorWithoutPayload,
    wsConnectionStart: ActionCreatorWithPayload<string>,
    wsConnectionSuccess: ActionCreatorWithoutPayload,
    wsGetMessage: ActionCreatorWithPayload<any>,
    wsConnectionClose: ActionCreatorWithoutPayload
}

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null
        return next => (action: Action & { payload: string }) => {
            const {dispatch} = store
            const {type, payload: url} = action
            const {
                wsConnectionClosed,
                wsConnectionError,
                wsConnectionStart,
                wsConnectionSuccess,
                wsGetMessage,
                wsConnectionClose
            } = wsActions

            if (type === wsConnectionStart.type) {
                socket = new WebSocket(url)
            }
            if (socket) {
                socket.onopen = () => dispatch(wsConnectionSuccess())
                socket.onerror = () => dispatch(wsConnectionError())
                socket.onclose = () => dispatch(wsConnectionClosed())
                socket.onmessage = (event: MessageEvent<string>) => {
                    const data= JSON.parse(event.data)
                    dispatch(wsGetMessage(data))
                }
                if (type === wsConnectionClose.type) {
                    socket.close(1000)
                }
            }

            next(action)
        }
    }) as Middleware
}