import {
    addIngredientToConstructor,
    getIngredientsFailed,
    getIngredientsRequest,
    getIngredientsSuccess,
    postOrderFailed,
    postOrderRequest,
    postOrderSuccess,
    removeIngredientFromConstructor, setTotalPrice
} from "../reducers/burger";
import {fetchRequest} from "../../utils/api";

export const getIngredientsThunk = () => (dispatch) => {
    dispatch(getIngredientsRequest())
    fetchRequest('/ingredients')
        .then(data => dispatch(getIngredientsSuccess(data.data)))
        .catch(error => {
            dispatch(getIngredientsFailed())
            console.log(`Api response error: ${error.message}`)
        })
}

export const postOrderThunk = (ingredientsIds) => (dispatch) => {
    dispatch(postOrderRequest())
    fetchRequest('/orders', {ingredients: ingredientsIds}, 'POST')
        .then(data => dispatch(postOrderSuccess(data.order.number)))
        .catch(error => {
            dispatch(postOrderFailed())
            console.log(`Api response error: ${error.message}`)
        })
}

export const dropIngredient = (ingredient, bun) => (dispatch) => {
    if (ingredient.type === 'bun' && bun) {
        if (bun._id === ingredient._id) return
        dispatch(removeIngredientFromConstructor(bun.constructorId))
    }
    dispatch(addIngredientToConstructor(ingredient))
}

export const calculateTotalPrice = (ingredients, bun) => (dispatch) => {
    let totalPrice = ingredients.reduce((prev, current) => prev + current.price, 0)
    if (bun) totalPrice += bun.price * 2
    dispatch(setTotalPrice(totalPrice))
}


