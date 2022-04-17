import {
    addIngredientToConstructor,
    getIngredientsFailed,
    getIngredientsRequest,
    getIngredientsSuccess,
    postOrderFailed,
    postOrderRequest,
    postOrderSuccess,
    removeIngredientFromConstructor,
    selectIngredients,
    setTotalPrice
} from "../reducers/burger";
import {authFetchRequest, fetchRequest} from "../../utils/api";
import {TConstructorIngredient} from "../../utils/types";
import {TBurgerState} from "../reducers/burger";

export const getIngredientsThunk = () => (dispatch: any, getState: () => TBurgerState) => {
    if (selectIngredients(getState()).length > 0) return

    dispatch(getIngredientsRequest())
    fetchRequest('/ingredients')
        .then(data => dispatch(getIngredientsSuccess(data.data)))
        .catch(error => {
            dispatch(getIngredientsFailed())
            console.log(`Get ingredients response error: ${error.message}`)
        })
}

export const postOrderThunk = (ingredientsIds: string[]) => (dispatch: any) => {
    dispatch(postOrderRequest())
    authFetchRequest('/orders', {ingredients: ingredientsIds}, 'POST')
        .then(data => {
            dispatch(postOrderSuccess(data.order.number))
        })
        .catch(error => {
            dispatch(postOrderFailed())
            console.log(`Post order response error: ${error.message}`)
        })
}

export const dropIngredient = (ingredient: TConstructorIngredient, bun: TConstructorIngredient | null) => (dispatch: any) => {
    if (ingredient.type === 'bun' && bun) {
        if (bun._id === ingredient._id) return
        dispatch(removeIngredientFromConstructor(bun.constructorId))
    }
    dispatch(addIngredientToConstructor(ingredient))
}

export const calculateTotalPrice = (ingredients: TConstructorIngredient[], bun: TConstructorIngredient | null) => (dispatch: any) => {
    let totalPrice = ingredients.reduce((prev, current) => prev + current.price, 0)
    if (bun) totalPrice += bun.price * 2
    dispatch(setTotalPrice(totalPrice))
}


