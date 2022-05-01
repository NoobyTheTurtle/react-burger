import {FC, useEffect, useMemo} from "react";
import styles from "./order-details.module.css";
import {useDispatch, useSelector} from "../../services/types/hooks";
import {
    selectOrderIngredients,
    selectOrders,
    wsConnectionClose,
    wsConnectionStart
} from "../../services/reducers/orders";
import {totalPrice, orderStatus} from "../../utils/order";
import dateFormat from "../../utils/date-format";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TBurgerIngredient} from "../../services/types/ingredient";
import {useLocation, useParams} from "react-router-dom";
import {getCookie} from "../../services/cookies";

type TOrderDetailsProps = {
    isModal?: boolean
}

const OrderDetails: FC<TOrderDetailsProps> = ({isModal = false}) => {
    const {orderId} = useParams()
    const orders = useSelector(selectOrders)
    const {pathname} = useLocation()
    const dispatch = useDispatch()
    const selectedOrder = useMemo(() => (
        orders.find((order) => order._id === orderId)
    ), [orders, orderId])

    const ingredients = useSelector(selectOrderIngredients(selectedOrder))
    const uniqIngredients = useMemo(() => {
        const ingredientsList: { [id: string]: { count: number, ingredient: TBurgerIngredient } } = {}
        ingredients.forEach((ingredient) => {
            if (ingredientsList[ingredient._id]) {
                ingredientsList[ingredient._id].count += 1
            } else {
                ingredientsList[ingredient._id] = {
                    count: 1,
                    ingredient
                }
            }
        })
        return ingredientsList
    }, [ingredients])

    useEffect(() => {
        if (!isModal) {
            if (pathname.indexOf("feed") === -1)
                dispatch(wsConnectionStart(`orders?token=${getCookie('accessToken')}`))
            else
                dispatch(wsConnectionStart('orders/all'))
        }

        return () => {
            if (!isModal)
                dispatch(wsConnectionClose())
        }
    }, [isModal, dispatch, pathname])

    return selectedOrder ? (
        <section className={styles.section}>
            {!isModal &&
                <p className={`${styles.number} text text_type_digits-default mb-10 mt-30`}>{`#${selectedOrder.number}`}</p>}
            <h1 className="text text_type_main-medium">{selectedOrder.name}</h1>
            <p className={`${selectedOrder.status === 'done' && styles.done} text text_type_main-default mt-3`}>
                {orderStatus(selectedOrder.status)}
            </p>
            <h2 className="text text_type_main-medium mt-15 mb-6">Состав:</h2>
            <ul className={styles.ul}>
                {Object.values(uniqIngredients).map(({count, ingredient}) => (
                    <li
                        className={`mr-6 ${styles.ingredient}`}
                        key={ingredient._id}
                    >
                        <span className={styles.image}><img src={ingredient.image_mobile} alt={ingredient.name}/></span>
                        <p className="text text_type_main-default ml-4">{ingredient.name}</p>
                        <div className={`${styles.price} text text_type_digits-default ml-4`}>
                            {`${count} x ${ingredient.price}`}
                            <CurrencyIcon type="primary"/>
                        </div>

                    </li>
                ))}
            </ul>
            <div className={`${styles.footer} mt-10`}>
                <span className="text text_type_main-default text_color_inactive">
                    {dateFormat(selectedOrder.createdAt)}
                </span>
                <div className={`${styles.price} text text_type_digits-default`}>
                    {totalPrice(ingredients)}
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </section>
    ) : (<></>)
}

export default OrderDetails