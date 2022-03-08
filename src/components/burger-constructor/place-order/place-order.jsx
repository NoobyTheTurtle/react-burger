import styles from "./place-order.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../modal/modal";
import OrderDetails from "../../order-details/order-details";
import React, {useEffect, useReducer, useState} from "react";
import {burgerIngredient, burgerIngredients} from "../../../utils/prop-types";
import {fetchRequest} from "../../../utils/api";

const CALCULATE_TOTAL_PRICE = 'CALCULATE_TOTAL_PRICE';

function calculateTotalPriceReducer(state, action) {
    switch (action.type) {
        case CALCULATE_TOTAL_PRICE: {
            let totalPrice = action.ingredients.reduce((prev, current) => prev + current.price, 0)
            if (action.bun) {
                totalPrice += action.bun.price * 2
            }
            return totalPrice
        }
        default:
            return 0
    }
}

const PlaceOrder = ({ingredients, bun}) => {
    const [orderTitle, setOrderTitle] = useState(null)
    const [sendRequest, setSendRequest] = useState(false)
    const [totalPrice, dispatchTotalPrice] = useReducer(calculateTotalPriceReducer, 0, undefined)
    const disabledButton = sendRequest || !bun || ingredients.length === 0

    const submitOrder = () => {
        setSendRequest(true)
        const ingredientsIds = ingredients.map(el => el._id).concat([bun._id, bun._id])

        fetchRequest('/orders', {ingredients: ingredientsIds}, 'POST')
            .then(data => setOrderTitle(data.order.number))
            .catch(error => console.log(`Api response error: ${error.message}`))
            .finally(() => setSendRequest(false))
    }

    useEffect(() => {
        dispatchTotalPrice({type: CALCULATE_TOTAL_PRICE, ingredients: ingredients, bun: bun})
    }, [ingredients, bun])

    if (!totalPrice) {
        return (<></>)
    }

    return (
        <div className={`${styles.placeOrder} mt-10 mr-4`}>
            <div className={`text text_type_digits-medium mr-10 ${styles.fullPrice}`}>
                {totalPrice}
                <div className={`${styles.currencyIcon} ml-2`}>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
            <Button type="primary" size="large" onClick={submitOrder} disabled={disabledButton}>
                Оформить заказ
            </Button>
            {orderTitle && (
                <Modal handleClose={() => setOrderTitle(null)}>
                    <OrderDetails title={orderTitle}/>
                </Modal>
            )}
        </div>
    )
}

PlaceOrder.propTypes = {
    ingredients: burgerIngredients,
    bun: burgerIngredient
}

export default PlaceOrder