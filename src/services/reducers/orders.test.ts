import ordersReducer, {
    wsConnectionClose,
    wsConnectionClosed,
    wsConnectionError,
    wsConnectionStart,
    wsConnectionSuccess, wsGetMessage
} from "./orders";
import {TOrder} from "../types/order";

const initialState = {
    orders: [],
    total: null,
    totalToday: null,
    isConnected: false,
    isError: false,
    url: ''
}

const order: TOrder = {
    _id: "628286d0fa747e001bd4837f",
    ingredients: ["60d3b41abdacab0026a733c7"],
    status: "done",
    name: "Space флюоресцентный бургер",
    createdAt: "2022-05-16T17:16:00.234Z",
    updatedAt: "2022-05-16T17:16:00.523Z",
    number: 15489
}

describe("Orders reducer", () => {
    it("should return the initial state", () => {
        expect(ordersReducer(undefined, {type: "test"})).toEqual(initialState)
    })

    it("should return state with url for connection", () => {
        const url = "wss://test"
        const expectedState = {...initialState, url: url}

        expect(ordersReducer(initialState, wsConnectionStart(url))).toEqual(expectedState)
    })

    it("should return state with connected", () => {
        const expectedState = {...initialState, isConnected: true}

        expect(ordersReducer(initialState, wsConnectionSuccess())).toEqual(expectedState)
    })

    it("should return state with error", () => {
        const expectedState = {...initialState, isError: true}

        expect(ordersReducer(initialState, wsConnectionError())).toEqual(expectedState)
    })

    it("when the connection is closed should return initial state", () => {
        expect(ordersReducer(initialState, wsConnectionClosed())).toEqual(initialState)
    })

    it("when the connection to close should return initial state", () => {
        expect(ordersReducer(initialState, wsConnectionClose())).toEqual(initialState)
    })

    it("should return state with message data", () => {
        const payload = {
            orders: [order],
            total: 1,
            totalToday: 1
        }
        const expectedState = {...initialState, ...payload}

        expect(ordersReducer(initialState, wsGetMessage({...payload, success: true}))).toEqual(expectedState)
    })
})