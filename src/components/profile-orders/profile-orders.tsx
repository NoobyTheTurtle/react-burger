import {useEffect} from "react";
import {useDispatch, useSelector} from "../../services/types/hooks";
import {selectOrders, wsConnectionClose, wsConnectionStart} from "../../services/reducers/orders";
import {getCookie} from "../../services/cookies";
import OrderCard from "../order-card/order-card";
import styles from "./profile-orders.module.css";
import Loader from "../loader/loader";

const ProfileOrders = () => {
    const dispatch = useDispatch()
    const orders = useSelector(selectOrders)

    useEffect(() => {
        dispatch(wsConnectionStart(`wss://norma.nomoreparties.space/orders?token=${getCookie('accessToken')}`))

        return () => {
            dispatch(wsConnectionClose())
        }
    }, [dispatch])

    return orders.length > 0 ? (
        <ul className={styles.ul}>
            {[...orders].sort((a, b) => (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())).map((order) => (
                <OrderCard order={order} key={order._id} isStatus={true}/>
            ))}
        </ul>
    ) : (
        <div style={{margin: "auto"}}>
            <Loader/>
        </div>
    )
}

export default ProfileOrders