import styles from "./selected-ingredients.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC, useCallback} from "react";
import SelectedIngredientsItem from "./selected-ingredients-item/selected-ingredients-item";
import {useDispatch} from "react-redux";
import {removeIngredientFromConstructor} from "../../../services/reducers/burger";
import {TConstructorIngredient} from "../../../utils/types";

type TSelectedIngredientsProps = {
    bun: TConstructorIngredient | null,
    ingredients: TConstructorIngredient[]
}

const SelectedIngredients: FC<TSelectedIngredientsProps> = ({bun, ingredients}) => {
    const dispatch = useDispatch()

    const handleClose = useCallback((ingredientId: string) => () => {
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
                            handleClose={handleClose(ingredient.constructorId)}
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

export default SelectedIngredients