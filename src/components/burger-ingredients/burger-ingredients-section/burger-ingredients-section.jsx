import styles from "./burger-ingredients-section.module.css";
import React from "react";
import PropTypes from "prop-types";
import BurgerIngredientsItem from "./burger-ingredients-item/burger-ingredients-item";
import {burgerIngredients} from "../../../utils/prop-types";


const BurgerIngredientsSection = React.forwardRef(({ingredients, title}, ref) => {
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

BurgerIngredientsSection.propTypes = {
    ingredients: burgerIngredients,
    title: PropTypes.string.isRequired
}

export default BurgerIngredientsSection