import styles from "./place-order.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../modal/modal";
import OrderDetails from "../../order-details/order-details";
import React, {FC, useEffect} from "react";
import {calculateTotalPrice, postOrderThunk} from "../../../services/actions/burger";
import {useDispatch, useSelector} from "../../../services/types/hooks";
import {
    clearIngredientsFromConstructor,
    deleteOrderNumber,
    selectOrderNumber,
    selectOrderRequest,
    selectTotalPrice
} from "../../../services/reducers/burger";
import {selectIsAuth} from "../../../services/reducers/auth";
import {useNavigate} from "react-router-dom";
import {TConstructorIngredient} from "../../../services/types/ingredient";
import Loader from "../../loader/loader";

type TPlaceOrderProps = {
    ingredients: TConstructorIngredient[],
    bun: TConstructorIngredient | null
}

const PlaceOrder: FC<TPlaceOrderProps> = ({ingredients, bun}) => {
    const dispatch = useDispatch()
    const orderRequest = useSelector(selectOrderRequest)
    const orderNumber = useSelector(selectOrderNumber)
    const totalPrice = useSelector(selectTotalPrice)
    const isAuth = useSelector(selectIsAuth)
    const navigate = useNavigate()
    const disabledButton = orderRequest || !bun || ingredients.length === 0

    const submitOrder = () => {
        if (!isAuth) {
            navigate("/login")
            return
        }

        if (!bun) return

        const ingredientsIds = ingredients.map(el => el._id).concat([bun._id, bun._id])
        dispatch(postOrderThunk(ingredientsIds))
    }

    const handleClose = () => {
        dispatch(clearIngredientsFromConstructor())
        dispatch(deleteOrderNumber())
    }

    useEffect(() => {
        dispatch(calculateTotalPrice(ingredients, bun))
    }, [dispatch, ingredients, bun])

    if (!totalPrice) return (<></>)

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
            {orderRequest ? (
                <Modal>
                    <Loader title="Заказ формируется"/>
                </Modal>
            ) : orderNumber && (
                <Modal handleClose={handleClose}>
                    <OrderDetails title={orderNumber}/>
                </Modal>)
            }
        </div>
    )
}

export default PlaceOrder