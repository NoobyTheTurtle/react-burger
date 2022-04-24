import type {Action, Middleware, MiddlewareAPI} from 'redux';
import {AppDispatch, RootState} from "../types";
import {
    wsConnectionClosed,
    wsConnectionError,
    wsConnectionStart,
    wsConnectionSuccess,
    wsGetMessage,
    wsConnectionClose
} from "../reducers/orders";

const WS_URL = 'wss://norma.nomoreparties.space/'

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null
        return next => (action: Action & { payload: string }) => {
            const {dispatch} = store
            const {type, payload: endpoint} = action

            if (type === wsConnectionStart.type) {
                socket = new WebSocket(WS_URL + endpoint)
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