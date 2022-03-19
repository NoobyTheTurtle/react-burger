import {createSlice, nanoid} from "@reduxjs/toolkit";

const initialState = {
    ingredients: [],
    constructorIngredients: [],
    chosenIngredient: null,
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
        getIngredientsSuccess(state, action) {
            state.ingredients = action.payload
        },
        getIngredientsFailed() {
            return initialState
        },
        setChosenIngredient(state, action) {
            state.chosenIngredient = action.payload
        },
        deleteChosenIngredient(state) {
            state.chosenIngredient = null
        },
        postOrderRequest(state) {
            state.orderRequest = true
        },
        postOrderSuccess(state, action) {
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
        addIngredientToConstructor(state, action) {
            state.constructorIngredients.push({...action.payload, constructorId: nanoid()})
        },
        removeIngredientFromConstructor(state, action) {
            state.constructorIngredients = state.constructorIngredients.filter((i) => i.constructorId !== action.payload)
        },
        setTotalPrice(state, action) {
            state.totalPrice = action.payload
        },
        replaceIngredient(state, action) {
            const { dragIndex, hoverIndex } = action.payload
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
    setChosenIngredient,
    deleteChosenIngredient,
    postOrderRequest,
    postOrderSuccess,
    postOrderFailed,
    deleteOrderNumber,
    addIngredientToConstructor,
    removeIngredientFromConstructor,
    setTotalPrice,
    replaceIngredient
} = burgerSlice.actions;

export const selectIngredients = (state) => state.burger.ingredients
export const selectConstructorIngredients = (state) => state.burger.constructorIngredients
export const selectOrderNumber = (state) => state.burger.order.number
export const selectChosenIngredient = (state) => state.burger.chosenIngredient
export const selectOrderRequest = (state) => state.burger.orderRequest
export const selectTotalPrice = (state) => state.burger.totalPrice

export default burgerSlice.reducer