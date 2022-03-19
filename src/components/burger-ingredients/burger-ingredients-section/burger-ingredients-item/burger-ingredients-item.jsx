import styles from "./burger-ingredients-item.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {burgerIngredient} from "../../../../utils/prop-types";
import {useDispatch, useSelector} from "react-redux";
import {selectConstructorIngredients, setChosenIngredient} from "../../../../services/reducers/burger";
import {useDrag} from "react-dnd";
import React, {useMemo} from "react";

const BurgerIngredientsItem = ({ingredient}) => {
    const dispatch = useDispatch()
    const constructorIngredients = useSelector(selectConstructorIngredients)
    const [, dragRef] = useDrag({
        type: 'ingredients', item: ingredient
    })

    const chooseIngredient = (ingredient) => () => {
        dispatch(setChosenIngredient(ingredient))
    }

    const count = useMemo(() => {
        return constructorIngredients.filter((i) => i._id === ingredient._id).length
    }, [constructorIngredients, ingredient])

    return (
        <li
            className={`${styles.li} mt-6 mb-2 ml-4 mr-2`}
            onClick={chooseIngredient(ingredient)}
            ref={dragRef}
        >
            {count > 0 && (
                <div className={styles.counter}>
                    <Counter count={count} size="default"/>
                </div>
            )}
            <img src={ingredient.image} alt="ingredient-icon" className={`${styles.img} ml-4 mr-4`}/>
            <div className={`mt-1 mb-1 ${styles.price}`}>
                    <span className="text text_type_digits-default pr-2">
                        {ingredient.price}
                    </span>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={`text text_type_main-default ${styles.name}`}>
                {ingredient.name}
            </p>
        </li>
    )
}

BurgerIngredientsItem.propTypes = {
    ingredient: burgerIngredient.isRequired
}

export default BurgerIngredientsItem