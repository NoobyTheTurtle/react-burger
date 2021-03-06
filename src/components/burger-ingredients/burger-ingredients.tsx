import styles from "./burger-ingredients.module.css";
import React, {useMemo, useRef} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "../../services/types/hooks";
import {selectIngredients} from "../../services/reducers/burger";
import BurgerIngredientsSection from "./burger-ingredients-section/burger-ingredients-section";

const categories = [
    {title: "Булки", type: "bun"},
    {title: "Соусы", type: "sauce"},
    {title: "Начинки", type: "main"}
]

const BurgerIngredients = () => {
    const ingredients = useSelector(selectIngredients)
    const [current, setCurrent] = React.useState<string>("bun")

    const ingredientsScrollBarRef = useRef<HTMLDivElement>(null)
    const bunRef = useRef<HTMLHeadingElement>(null)
    const sauceRef = useRef<HTMLHeadingElement>(null)
    const mainRef = useRef<HTMLHeadingElement>(null)

    const onTabClick = (tab: string) => {
        setCurrent(tab)
        switch (tab) {
            case 'bun':
                if (!bunRef?.current) break
                bunRef.current.scrollIntoView({behavior: 'smooth'})
                break
            case 'sauce':
                if (!sauceRef?.current) break
                sauceRef.current.scrollIntoView({behavior: 'smooth'})
                break
            case 'main':
                if (!mainRef?.current) break
                mainRef.current.scrollIntoView({behavior: 'smooth'})
                break
            default:
        }
    }

    const handleScroll = () => {
        if (ingredientsScrollBarRef?.current && mainRef?.current && bunRef?.current && sauceRef?.current) {
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
        </section>
    )
}

export default BurgerIngredients