import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TOrder} from "../types/order";
import {TGetMessage} from "../types/ws-data";
import {RootState} from "../types";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import {TBurgerIngredient} from "../types/ingredient";

type TOrdersState = {
    orders: TOrder[]
    total: number | null
    totalToday: number | null
    isConnected: boolean
    isError: boolean,
    url: string
}

const initialState: TOrdersState = {
    orders: [],
    total: null,
    totalToday: null,
    isConnected: false,
    isError: false,
    url: ''
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        wsConnectionStart(state, action: PayloadAction<string>) {
            state.url = action.payload
        },
        wsConnectionSuccess(state) {
            state.isConnected = true
            state.isError = false
        },
        wsConnectionError(state) {
            state = initialState
            state.isError = true
        },
        wsConnectionClosed() {
            return initialState
        },
        wsConnectionClose() {
            return initialState
        },
        wsGetMessage(state, action: PayloadAction<TGetMessage>) {
            const {payload} = action
            if (payload.success) {
                state.orders = payload.orders
                state.total = payload.total
                state.totalToday = payload.totalToday
            }
        }

    }
})

export const {
    wsConnectionStart,
    wsConnectionSuccess,
    wsConnectionError,
    wsConnectionClosed,
    wsGetMessage,
    wsConnectionClose
} = ordersSlice.actions

export const selectOrders = (state: RootState) => state.orders.orders
export const selectTotalOrders = (state: RootState) => state.orders.total
export const selectTotalOrdersToday = (state: RootState) => state.orders.totalToday
export const selectOrderIngredients= (order: TOrder | undefined) => (state: RootState) => {
    const orderIngredients: TBurgerIngredient[] = []
    if (!order) return orderIngredients
    order.ingredients.forEach((id) => {
        const ingredient = state.burger.ingredients.find((i) => i._id === id)
        if (ingredient) orderIngredients.push(ingredient)
    })
    return orderIngredients.sort((a, b) => a.type.length - b.type.length)
}

export default ordersSlice.reducer