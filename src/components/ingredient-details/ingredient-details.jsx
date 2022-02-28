import styles from "./ingredient-details.module.css"
import {burgerIngredient} from "../../utils/prop-types";

const IngredientDetails = (props) => {
    return (
        <section className={styles.section}>
            <img src={props.image_large} alt={props.name}/>
            <h3 className="text text_type_main-medium mb-8 mt-4">{props.name}</h3>
            <div className={styles.infoContainer}>
                <div className={styles.info}>
                    <span className="text text_type_main-default text_color_inactive">Калории,ккал</span>
                    <span className="text text_type_digits-default text_color_inactive">{props.calories}</span>
                </div>
                <div className={styles.info}>
                    <span className="text text_type_main-default text_color_inactive">Белки, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{props.proteins}</span>
                </div>
                <div className={styles.info}>
                    <span className="text text_type_main-default text_color_inactive">Жиры, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{props.fat}</span>
                </div>
                <div className={styles.info}>
                    <span className="text text_type_main-default text_color_inactive">Углеводы, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{props.carbohydrates}</span>
                </div>
            </div>
        </section>
    )
}

IngredientDetails.propsTypes = burgerIngredient.isRequired

export default IngredientDetails