import {FC, useEffect} from "react";
import OrdersList from "../../components/orders-list/orders-list";
import OrdersStatistics from "../../components/orders-statistics/orders-statistics";
import {useDispatch, useSelector} from "../../services/types/hooks";
import {selectOrders, wsConnectionClose, wsConnectionStart} from "../../services/reducers/orders";
import styles from "./feed.module.css";
import Loader from "../../components/loader/loader";

const Feed: FC = () => {
    const dispatch = useDispatch()
    const orders = useSelector(selectOrders)

    useEffect(() => {
        dispatch(wsConnectionStart('orders/all'))

        return () => {
            dispatch(wsConnectionClose())
        }
    }, [dispatch])

    return (
        <section className={styles.section}>
            {orders.length > 0 ? (<>
                <h2 className={"text text_type_main-large mt-10"}>Лента заказов</h2>
                <div className={`${styles.container} mt-5`}>
                    <OrdersList/>
                    <OrdersStatistics/>
                </div>
            </>) : (
                <div className="mt-30">
                    <Loader/>
                </div>
            )}
        </section>
    )
}

export default Feed