import styles from "./burger-ingredients-section.module.css";
import React from "react";
import BurgerIngredientsItem from "./burger-ingredients-item/burger-ingredients-item";
import {TBurgerIngredient} from "../../../services/types/ingredient";

type TBurgerIngredientsSectionProps = {
    ingredients: TBurgerIngredient[],
    title: string
}

const BurgerIngredientsSection = React.forwardRef<HTMLHeadingElement, TBurgerIngredientsSectionProps>
(({ingredients, title}, ref) => {
    if (ingredients.length === 0) return (<></>)

    return (
        <>
            <h2 className="text text_type_main-medium" ref={ref}>{title}</h2>
            <ul className={`${styles.ul} pb-10`}>
                {ingredients.map((ingredient) => (
                    <BurgerIngredientsItem ingredient={ingredient} key={ingredient._id}/>
                ))}
            </ul>
        </>
    )
})

export default BurgerIngredientsSection