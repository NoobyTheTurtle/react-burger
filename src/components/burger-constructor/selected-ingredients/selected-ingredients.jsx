import styles from "./selected-ingredients.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {burgerIngredient, burgerIngredients} from "../../../utils/prop-types";
import React from "react";

const SelectedIngredients = ({bun, ingredients}) => {
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
                    ingredients.map((item) => (
                        <li className={`${styles.li} mt-4 mb-4 mr-2`} key={item._id}>
                            <div className={styles.icon}>
                                <DragIcon type="primary"/>
                            </div>
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image_mobile}
                            />
                        </li>
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
    bun: burgerIngredient,
    ingredients: burgerIngredients
}

export default SelectedIngredients