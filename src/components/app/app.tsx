import React, {useEffect} from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css"
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {useDispatch} from "react-redux";
import {getIngredientsThunk} from "../../services/actions/burger";
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getIngredientsThunk())
    }, [dispatch])

    return (
        <>
            <AppHeader/>
            <main className={styles.main}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </DndProvider>
            </main>
        </>
    );
}

export default App;
