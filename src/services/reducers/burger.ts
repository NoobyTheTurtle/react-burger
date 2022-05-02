import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {TBurgerIngredient, TConstructorIngredient} from "../types/ingredient";
import {RootState} from "../types";

type TBurgerState = {
    ingredients: TBurgerIngredient[],
    constructorIngredients: TConstructorIngredient[],
    order: {
        number: number | null
    },
    orderRequest: boolean,
    totalPrice: number
}

const initialState: TBurgerState = {
    ingredients: [],
    constructorIngredients: [],
    order: {
        number: null
    },
    orderRequest: false,
    totalPrice: 0
}

const burgerSlice = createSlice({
    name: 'burger',
    initialState,
    reducers: {
        getIngredientsRequest() {
        },
        getIngredientsSuccess(state, action: PayloadAction<TBurgerIngredient[]>) {
            state.ingredients = action.payload
        },
        getIngredientsFailed() {
            return initialState
        },
        postOrderRequest(state) {
            state.orderRequest = true
        },
        postOrderSuccess(state, action: PayloadAction<number | null>) {
            state.orderRequest = false
            state.order.number = action.payload
        },
        postOrderFailed(state) {
            state.orderRequest = false
            state.order.number = null
        },
        deleteOrderNumber(state) {
            state.order.number = null
        },
        addIngredientToConstructor(state, action: PayloadAction<TConstructorIngredient>) {
            state.constructorIngredients.push({...action.payload, constructorId: nanoid()})
        },
        removeIngredientFromConstructor(state, action: PayloadAction<string>) {
            state.constructorIngredients = state.constructorIngredients.filter((i) => i.constructorId !== action.payload)
        },
        clearIngredientsFromConstructor(state) {
            state.constructorIngredients = []
        },
        setTotalPrice(state, action: PayloadAction<number>) {
            state.totalPrice = action.payload
        },
        replaceIngredient(state, action: PayloadAction<{dragIndex: number, hoverIndex: number}>) {
            const {dragIndex, hoverIndex} = action.payload
            const dragItem = state.constructorIngredients[dragIndex]
            state.constructorIngredients.splice(dragIndex, 1)
            state.constructorIngredients.splice(hoverIndex, 0, dragItem)
        }
    }
})

export const {
    getIngredientsRequest,
    getIngredientsSuccess,
    getIngredientsFailed,
    postOrderRequest,
    postOrderSuccess,
    postOrderFailed,
    deleteOrderNumber,
    addIngredientToConstructor,
    removeIngredientFromConstructor,
    setTotalPrice,
    replaceIngredient,
    clearIngredientsFromConstructor
} = burgerSlice.actions

export const selectIngredients = (state: RootState) => state.burger.ingredients
export const selectConstructorIngredients = (state: RootState) => state.burger.constructorIngredients
export const selectOrderNumber = (state: RootState) => state.burger.order.number
export const selectOrderRequest = (state: RootState) => state.burger.orderRequest
export const selectTotalPrice = (state: RootState) => state.burger.totalPrice

export default burgerSlice.reducer