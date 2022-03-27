import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import rootReducer from "./services/reducers";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import Pages from "./pages";
import {BrowserRouter} from "react-router-dom";

const store = configureStore({
    reducer: rootReducer
})

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Pages/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
