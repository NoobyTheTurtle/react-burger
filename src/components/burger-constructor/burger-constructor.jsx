import styles from "./burger-constructor.module.css";
import SelectedIngredients from "./selected-ingredients/selected-ingredients";
import PlaceOrder from "./place-order/place-order";
import {useContext, useMemo} from "react";
import {IngredientsContext} from "../../services/appContext";

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const BurgerConstructor = () => {
    const ingredients = useContext(IngredientsContext)

    const otherIngredients = useMemo(() => {
        return ingredients.filter((el) => el.type !== 'bun')
    }, [ingredients])

    const onlyBuns = useMemo(() => {
        return ingredients.filter((el) => el.type === 'bun')
    }, [ingredients])

    const getRandomBun = useMemo(() => {
        return onlyBuns[randomInteger(0, onlyBuns.length - 1)]
    }, [onlyBuns])

    const getRandomOtherIngredients = useMemo(() => {
        return otherIngredients.slice(0, randomInteger(1, otherIngredients.length - 1))
            .sort(() => Math.random() - 0.5)
    }, [otherIngredients])

    return (
        <section className={`${styles.section} pt-25 ml-10`}>
            <ul className={`${styles.ul}`}>
                <SelectedIngredients bun={getRandomBun} ingredients={getRandomOtherIngredients}/>
                <PlaceOrder ingredients={getRandomOtherIngredients} bun={getRandomBun}/>
            </ul>
        </section>
    )
}

export default BurgerConstructor