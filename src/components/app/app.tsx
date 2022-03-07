import React, {useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css"
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {fetchRequest} from "../../utils/api";
import {IngredientsContext} from "../../services/appContext";

function App() {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        fetchRequest('/ingredients').then(data => setIngredients(data.data))
            .catch(error => console.log(`Api response error: ${error.message}`))
    }, [])

    return (
        <>
            <AppHeader/>
            <main className={styles.main}>
                {ingredients.length > 0 && (
                    <IngredientsContext.Provider value={ingredients}>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </IngredientsContext.Provider>
                )}
            </main>
        </>
    );
}

export default App;
