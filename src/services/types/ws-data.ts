import {TOrder} from "./order";

export type TGetMessage = {
    orders: TOrder[]
    success: boolean
    total: number
    totalToday: number
}