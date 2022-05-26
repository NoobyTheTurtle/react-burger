import burgerReducer, {
    addIngredientToConstructor, clearIngredientsFromConstructor,
    deleteOrderNumber,
    getIngredientsFailed,
    getIngredientsRequest,
    getIngredientsSuccess, postOrderFailed,
    postOrderRequest, postOrderSuccess, removeIngredientFromConstructor, replaceIngredient, setTotalPrice
} from "./burger";
import {nanoid} from "nanoid";
import {TBurgerIngredient} from "../types/ingredient";

jest.mock('nanoid')
const mockedNanoid = jest.mocked(nanoid)
const constructorId = 'mock id'

const initialState = {
    ingredients: [],
    constructorIngredients: [],
    order: {
        number: null
    },
    orderRequest: false,
    totalPrice: 0
}

const ingredientBun: TBurgerIngredient = {
    _id: "60d3b41abdacab0026a7335",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 100,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0
}

const ingredientSauce: TBurgerIngredient = {
    ...ingredientBun,
    type: "sauce",
    _id: "60d3b41abdacab0026a7336"
}

const ingredientMain: TBurgerIngredient = {
    ...ingredientBun,
    type: "main",
    _id: "60d3b41abdacab0026a7338"
}

const ingredients = [ingredientBun, ingredientSauce, ingredientMain]

describe("Burger reducer", () => {
    it("should return the initial state", () => {
        expect(burgerReducer(undefined, {type: "test"})).toEqual(initialState)
    })

    it("when get ingredients request, then return actual state", () => {
        expect(burgerReducer(initialState, getIngredientsRequest())).toEqual(initialState)
    })

    it("when get ingredients success, then return state with ingredients", () => {
        const expectedState = {...initialState, ingredients}

        expect(burgerReducer(initialState, getIngredientsSuccess(ingredients))).toEqual(expectedState)
    })

    it("when get ingredients failed, then return initial state", () => {
        expect(burgerReducer(initialState, getIngredientsFailed())).toEqual(initialState)
    })

    it("when post order request, then return state with requesting", () => {
        const expectedState = {...initialState, orderRequest: true}

        expect(burgerReducer(initialState, postOrderRequest())).toEqual(expectedState)
    })

    it("when post order success, then return state with order number", () => {
        const expectedState = {...initialState, order: {number: 100}}

        expect(burgerReducer(initialState, postOrderSuccess(100))).toEqual(expectedState)
    })

    it("when post order failed, then return state with error request", () => {
        const state = {...initialState, ingredients, totalPrice: 300}
        const expectedState = {...state, orderRequest: false, order: {number: null}}

        expect(burgerReducer(state, postOrderFailed())).toEqual(expectedState)
    })

    it("when delete order number, then return state without order number", () => {
        const state = {...initialState, order: {number: 100}}

        expect(burgerReducer(state, deleteOrderNumber())).toEqual(initialState)
    })

    it("when add ingredient to constructor, then return state with added ingredient", () => {
        mockedNanoid.mockReturnValue(constructorId)
        const expectedState = {...initialState, constructorIngredients: [{...ingredientBun, constructorId}]}

        expect(burgerReducer(initialState, addIngredientToConstructor(ingredientBun))).toEqual(expectedState)
    })

    it("when remove ingredient from constructor, then return without removed ingredient", () => {
        const state = {...initialState, constructorIngredients: [{...ingredientBun, constructorId}]}

        expect(burgerReducer(state, removeIngredientFromConstructor(constructorId))).toEqual(initialState)
    })

    it("when clear ingredients from constructor, then return state with empty constructor ingredients", () => {
        const state = {...initialState, constructorIngredients: [{...ingredientBun, constructorId}, {...ingredientMain, constructorId: constructorId + '2'}]}

        expect(burgerReducer(state, clearIngredientsFromConstructor())).toEqual(initialState)
    })

    it("when set total price, then return state with total price", () => {
        const expectedState = {...initialState, totalPrice: 100}

        expect(burgerReducer(initialState, setTotalPrice(100))).toEqual(expectedState)
    })

    it("when replace ingredient then return state with replaced ingredients", () => {
        const state = {...initialState, constructorIngredients: [{...ingredientBun, constructorId}, {...ingredientMain, constructorId: constructorId + '2'}]}
        const expectedState = {...initialState, constructorIngredients: [{...ingredientMain, constructorId: constructorId + '2'}, {...ingredientBun, constructorId}]}

        expect(burgerReducer(state, replaceIngredient({dragIndex: 0, hoverIndex: 1}))).toEqual(expectedState)
    })
})