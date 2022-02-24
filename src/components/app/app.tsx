import React, {useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css"
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {fetchIngredients} from "../../utils/api";

function App() {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        fetchIngredients.then(data => setApiData(data.data))
            .catch(error => console.log(`Api response error: ${error.message}`))
    }, [])

    return (
        <>
            <AppHeader/>
            <main className={styles.main}>
                {apiData.length > 0 && (
                    <>
                        <BurgerIngredients ingredients={apiData}/>
                        <BurgerConstructor ingredients={apiData}/>
                    </>
                )}
            </main>
        </>
    );
}

export default App;
