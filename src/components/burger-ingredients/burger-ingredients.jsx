import styles from "./burger-ingredients.module.css";
import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsItem from "./burger-ingredients-item/burger-ingredients-item";
import {burgerIngredients} from "../../utils/prop-types";

const categories = [
    {title: "Булки", type: "bun"},
    {title: "Соусы", type: "sauce"},
    {title: "Начинки", type: "main"}
]

const BurgerIngredients = ({ingredients}) => {
    const [current, setCurrent] = React.useState("bun")

    return (
        <section className={`${styles.section} pt-10`}>
            <h1 className={`text text_type_main-large`}>Соберите бургер</h1>
            <div className={`${styles.categories} mt-5`}>
                {categories.map((item) =>
                    <Tab key={item.type} value={item.type} active={current === item.type} onClick={setCurrent}>
                        {item.title}
                    </Tab>
                )}
            </div>
            <div className={`${styles.ingredients} mt-10`}>
                {
                    categories.map((c) => <BurgerIngredientsItem
                        key={c.type}
                        title={c.title}
                        ingredients={ingredients.filter((i) => i.type === c.type)}
                    />)
                }
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    ingredients: burgerIngredients
}

export default BurgerIngredients