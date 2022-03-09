import styles from "./burger-constructor.module.css";
import SelectedIngredients from "./selected-ingredients/selected-ingredients";
import PlaceOrder from "./place-order/place-order";
import React, {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectConstructorIngredients} from "../../services/reducers/burger";
import {useDrop} from "react-dnd";
import {dropIngredient} from "../../services/actions/burger";

const BurgerConstructor = () => {
    const ingredients = useSelector(selectConstructorIngredients)
    const dispatch = useDispatch()
    const [, dropRef] = useDrop({
        accept: 'ingredients',
        drop(ingredient) {
            dispatch(dropIngredient(ingredient, bun))
        }
    })

    const otherIngredients = useMemo(() => {
        return ingredients.filter((el) => el.type !== 'bun')
    }, [ingredients])

    const bun = useMemo(() => {
        return ingredients.find((el) => el.type === 'bun') || null
    }, [ingredients])

    return (
        <section className={`${styles.section} pt-25 ml-10`} ref={dropRef}>
            <ul className={`${styles.ul}`}>
                <SelectedIngredients bun={bun} ingredients={ingredients}/>
                <PlaceOrder bun={bun} ingredients={otherIngredients}/>
            </ul>
        </section>
    )
}

export default BurgerConstructor