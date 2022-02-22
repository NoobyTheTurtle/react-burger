import styles from "./burger-ingredients-item.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {burgerIngredients} from "../../../utils/prop-types";

const BurgerIngredientsItem = ({title, ingredients}) => {
    return (
        <>
            <h2 className="text text_type_main-medium">{title}</h2>
            <ul className={`${styles.ul} pb-10`}>
                {
                    ingredients.map((item) => <li key={item._id} className={`${styles.li} mt-6 mb-2 ml-4 mr-2`}>
                        <div className={styles.counter}>
                            <Counter count={1} size="default"/>
                        </div>
                        <img src={item.image} alt="ingredient-icon" className={`${styles.img} ml-4 mr-4`}/>
                        <div className={`mt-1 mb-1 ${styles.price}`}>
                            <span className="text text_type_digits-default pr-2">
                                {item.price}
                            </span>
                            <CurrencyIcon type="primary"/>
                        </div>
                        <p className={`text text_type_main-default ${styles.name}`}>
                            {item.name}
                        </p>
                    </li>)
                }
            </ul>
        </>
    )
}

BurgerIngredientsItem.propTypes = {
    title: PropTypes.string,
    ingredients: burgerIngredients
}

export default BurgerIngredientsItem