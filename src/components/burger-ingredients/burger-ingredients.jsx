import styles from "./burger-ingredients.module.css";
import React, {useMemo, useRef} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {deleteChosenIngredient, selectChosenIngredient, selectIngredients} from "../../services/reducers/burger";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import BurgerIngredientsSection from "./burger-ingredients-section/burger-ingredients-section";

const categories = [
    {title: "Булки", type: "bun"},
    {title: "Соусы", type: "sauce"},
    {title: "Начинки", type: "main"}
]

const BurgerIngredients = () => {
    const chosenIngredient = useSelector(selectChosenIngredient)
    const ingredients = useSelector(selectIngredients)
    const dispatch = useDispatch()
    const [current, setCurrent] = React.useState("bun")

    const ingredientsScrollBarRef = useRef(null)
    const bunRef = useRef(null)
    const sauceRef = useRef(null)
    const mainRef = useRef(null)

    const removeChosenIngredient = () => {
        dispatch(deleteChosenIngredient())
    }

    const onTabClick = (tab) => {
        setCurrent(tab)
        switch (tab) {
            case 'bun':
                bunRef.current.scrollIntoView({ behavior: 'smooth'})
                break
            case 'sauce':
                sauceRef.current.scrollIntoView({ behavior: 'smooth'})
                break
            case 'main':
                mainRef.current.scrollIntoView({ behavior: 'smooth'})
                break
            default:
        }
    }

    const handleScroll = () => {
        const scrollTop = ingredientsScrollBarRef.current.getBoundingClientRect().top
        const bunTopDistance = Math.abs(scrollTop - bunRef.current.getBoundingClientRect().top)
        const sauceTopDistance = Math.abs(scrollTop - sauceRef.current.getBoundingClientRect().top)
        const mainTopDistance = Math.abs(scrollTop - mainRef.current.getBoundingClientRect().top)

        if (bunTopDistance < sauceTopDistance) {
            setCurrent('bun')
        } else if (sauceTopDistance < mainTopDistance) {
            setCurrent('sauce')
        } else {
            setCurrent('main')
        }
    }

    const buns = useMemo(() => (
        <BurgerIngredientsSection
            ingredients={ingredients.filter((i) => i.type === 'bun')}
            title={'Булки'}
            key={"bun"}
            ref={bunRef}
        />
    ), [ingredients])

    const sauces = useMemo(() => (
        <BurgerIngredientsSection
            ingredients={ingredients.filter((i) => i.type === 'sauce')}
            title={'Соусы'}
            key={"sauce"}
            ref={sauceRef}
        />
    ), [ingredients])

    const mains = useMemo(() => (
        <BurgerIngredientsSection
            ingredients={ingredients.filter((i) => i.type === 'main')}
            title={'Начинки'}
            key={"main"}
            ref={mainRef}
        />
    ), [ingredients])

    if (ingredients.length === 0) return (<></>)

    return (
        <section className={`${styles.section} pt-10`}>
            <h1 className={`text text_type_main-large`}>Соберите бургер</h1>
            <div className={`${styles.categories} mt-5`}>
                {
                    categories.map((c) => (
                        <Tab key={c.type} value={c.type} active={current === c.type} onClick={onTabClick}>
                            {c.title}
                        </Tab>
                    ))
                }
            </div>
            <div
                className={`${styles.ingredients} mt-10`}
                ref={ingredientsScrollBarRef}
                onScroll={handleScroll}
            >
                {
                    [buns, sauces, mains]
                }
            </div>
            {chosenIngredient &&
                (<Modal handleClose={removeChosenIngredient} title={"Детали ингредиента"}>
                    <IngredientDetails
                        {...chosenIngredient}
                    />
                </Modal>)
            }
        </section>
    )
}

export default BurgerIngredients