import React, {useEffect} from 'react';
import AppHeader from "../app-header/app-header";
import styles from "./app.module.css"
import {Outlet} from "react-router-dom";
import {useDispatch} from "../../services/types/hooks";
import {getIngredientsThunk} from "../../services/actions/burger";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getIngredientsThunk())
    }, [dispatch])

    return (
        <>
            <AppHeader/>
            <main className={styles.main}>
                <Outlet/>
            </main>
        </>
    );
}

export default App;