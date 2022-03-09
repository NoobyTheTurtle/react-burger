import styles from "./selected-ingredients.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {constructorIngredient, constructorIngredients} from "../../../utils/prop-types";
import React, {useCallback} from "react";
import SelectedIngredientsItem from "./selected-ingredients-item/selected-ingredients-item";
import {useDispatch} from "react-redux";
import {removeIngredientFromConstructor} from "../../../services/reducers/burger";

const SelectedIngredients = ({bun, ingredients}) => {
    const dispatch = useDispatch()

    const handleClose = useCallback((ingredientId) => (e) => {
        e.preventDefault()
        dispatch(removeIngredientFromConstructor(ingredientId))
    }, [dispatch])

    return (
        <>
            {bun && (
                <li className={`${styles.li} pl-8 mr-4`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />
                </li>
            )}
            <div className={`${styles.ingredients}`}>
                {
                    ingredients.map((ingredient, index) => ingredient.type !== 'bun' && (
                        <SelectedIngredientsItem
                            ingredient={ingredient}
                            key={ingredient.constructorId}
                            id={ingredient.constructorId}
                            index={index}
                            handleClose={handleClose}
                        />
                    ))
                }
            </div>
            {bun && (
                <li className={`${styles.li} pl-8 mr-4`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />
                </li>
            )}
        </>
    )
}

SelectedIngredients.propTypes = {
    bun: constructorIngredient,
    ingredients: constructorIngredients
}

export default SelectedIngredients