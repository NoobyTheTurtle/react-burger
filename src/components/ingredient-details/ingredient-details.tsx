import styles from "./ingredient-details.module.css"
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIngredients} from "../../services/reducers/burger";
import {FC, useMemo} from "react";
import {TBurgerIngredient} from "../../utils/types";

type TIngredientDetailsProps = {
    title?: string
}

const IngredientDetails: FC<TIngredientDetailsProps> = ({title}) => {
    const {ingredientId} = useParams()
    const ingredients: TBurgerIngredient[] = useSelector(selectIngredients)
    const chosenIngredient = useMemo(() => (
        ingredients.find(i => i._id === ingredientId)
    ), [ingredients, ingredientId])

    return chosenIngredient ? (
        <section className={styles.section}>
            {title && (<h2 className={`${styles.title} text text text_type_main-large mt-30`}>{title}</h2>)}
            <img src={chosenIngredient.image_large} alt={chosenIngredient.name}/>
            <h3 className="text text_type_main-medium mb-8 mt-4">{chosenIngredient.name}</h3>
            <div className={styles.infoContainer}>
                <div className={styles.info}>
                    <span className="text text_type_main-default text_color_inactive">Калории,ккал</span>
                    <span
                        className="text text_type_digits-default text_color_inactive">{chosenIngredient.calories}</span>
                </div>
                <div className={styles.info}>
                    <span className="text text_type_main-default text_color_inactive">Белки, г</span>
                    <span
                        className="text text_type_digits-default text_color_inactive">{chosenIngredient.proteins}</span>
                </div>
                <div className={styles.info}>
                    <span className="text text_type_main-default text_color_inactive">Жиры, г</span>
                    <span
                        className="text text_type_digits-default text_color_inactive">{chosenIngredient.fat}</span>
                </div>
                <div className={styles.info}>
                    <span className="text text_type_main-default text_color_inactive">Углеводы, г</span>
                    <span
                        className="text text_type_digits-default text_color_inactive">{chosenIngredient.carbohydrates}</span>
                </div>
            </div>
        </section>
    ) : (<></>)
}

export default IngredientDetails