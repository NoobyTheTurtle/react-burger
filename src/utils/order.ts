import {TBurgerIngredient} from "../services/types/ingredient";

export  const orderStatus = (status: 'done' | 'created' | 'pending') => {
    switch (status) {
        case 'done':
            return 'Выполнен'
        case 'created':
            return 'Создан'
        case 'pending':
            return 'Готовится'
    }
}

export const totalPrice = (ingredients: TBurgerIngredient[]) => {
    return ingredients.reduce((prev, current) => prev + current.price, 0)
}