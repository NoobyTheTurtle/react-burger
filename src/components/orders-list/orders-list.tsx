import {FC} from "react";
import styles from "./orders-list.module.css";
import {useSelector} from "../../services/types/hooks";
import {selectOrders} from "../../services/reducers/orders";
import OrderCard from "../order-card/order-card";

const OrdersList: FC = () => {
    const orders = useSelector(selectOrders)

    return (
        <section className={styles.section}>
            <ul className={styles.ul}>
                {orders.map((order) =>
                    (<OrderCard key={order._id} order={order}/>)
                )}
            </ul>
        </section>
    )
}

export default OrdersList