import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css"
import {data} from "../../utils/data";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
    return (
        <>
            <AppHeader/>
            <main className={styles.main}>
                <BurgerIngredients ingredients={data}/>
                <BurgerConstructor ingredients={data}/>
            </main>
        </>
    );
}

export default App;
