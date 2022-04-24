import {FC, useMemo} from 'react';
import {useSelector} from "../../services/types/hooks";
import {selectOrders, selectTotalOrders, selectTotalOrdersToday} from "../../services/reducers/orders";
import styles from "./orders-info.module.css";

const OrdersInfo: FC = () => {
    const total = useSelector(selectTotalOrders)
    const totalToday = useSelector(selectTotalOrdersToday)
    const orders = useSelector(selectOrders)

    const inProgressOrders = useMemo(() =>
            orders.filter((order) => order.status !== 'done')
        , [orders])

    const doneOrders = useMemo(() =>
            orders.filter((order) => order.status === 'done')
        , [orders])

    return (
        <section className={`${styles.section} ml-15`}>
            <div className={styles.numbers}>
                <div>
                    <h3 className="text text_type_main-medium pb-6">Готовы:</h3>
                    <ul className={styles.ul}>
                        {doneOrders.map((order) => (
                            <li key={order._id}
                                className={`text text_type_digits-default ${styles.numbers_done} mb-2`}
                            >{order.number}</li>
                        ))}
                    </ul>
                </div>
                <div className="ml-9">
                    <h3 className="text text_type_main-medium pb-6">В работе:</h3>
                    <ul className={styles.ul}>
                        {inProgressOrders.map((order) => (
                            <li key={order._id} className="text text_type_digits-default mb-2">{order.number}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="mt-15">
                <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
                <p className="text text_type_digits-large">{total}</p>
            </div>
            <div className="mt-15">
                <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
                <p className="text text_type_digits-large">{totalToday}</p>
            </div>
        </section>
    )
}

export default OrdersInfo