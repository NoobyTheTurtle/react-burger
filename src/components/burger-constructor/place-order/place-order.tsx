import styles from "./place-order.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../modal/modal";
import OrderDetails from "../../order-details/order-details";
import React, {FC, useEffect} from "react";
import {calculateTotalPrice, postOrderThunk} from "../../../services/actions/burger";
import {useDispatch, useSelector} from "react-redux";
import {
    clearIngredientsFromConstructor,
    deleteOrderNumber,
    selectOrderNumber,
    selectOrderRequest,
    selectTotalPrice
} from "../../../services/reducers/burger";
import {selectIsAuth} from "../../../services/reducers/auth";
import {useNavigate} from "react-router-dom";
import loader from "../../../images/loader.gif"
import {TConstructorIngredient} from "../../../utils/types";

type TPlaceOrderProps = {
    ingredients: TConstructorIngredient[],
    bun: TConstructorIngredient | null
}

const PlaceOrder: FC<TPlaceOrderProps> = ({ingredients, bun}) => {
    const dispatch = useDispatch()
    const orderRequest: boolean = useSelector(selectOrderRequest)
    const orderNumber: number | null = useSelector(selectOrderNumber)
    const totalPrice: number = useSelector(selectTotalPrice)
    const isAuth: boolean = useSelector(selectIsAuth)
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
                    <section className={styles.waitSection}>
                        <img src={loader} alt={"loader"} width={70} height={70}/>
                        <h2 className="text text_type_main-large mt-10">Заказ формируется</h2>
                    </section>
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