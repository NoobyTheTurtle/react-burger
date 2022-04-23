import styles from "./burger-ingredients-item.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {selectConstructorIngredients} from "../../../../services/reducers/burger";
import {useDrag} from "react-dnd";
import React, {FC, useMemo} from "react";
import {Link, useLocation} from "react-router-dom";
import {TBurgerIngredient, TConstructorIngredient} from "../../../../utils/types";

type TBurgerIngredientsItemProps = {
    ingredient: TBurgerIngredient
}

const BurgerIngredientsItem: FC<TBurgerIngredientsItemProps> = ({ingredient}) => {
    const location = useLocation()
    const constructorIngredients: TConstructorIngredient[] = useSelector(selectConstructorIngredients)
    const [, dragRef] = useDrag({
        type: 'ingredients', item: ingredient
    })

    const count = useMemo(() => {
        return constructorIngredients.filter((i) => i._id === ingredient._id).length
    }, [constructorIngredients, ingredient])

    return (
        <Link
            className={styles.link}
            to={`/ingredients/${ingredient._id}`}
            state={{background: location}}
        >
            <li
                className={`${styles.li} mt-6 mb-2 ml-4 mr-2`}
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
        </Link>
    )
}

export default BurgerIngredientsItem