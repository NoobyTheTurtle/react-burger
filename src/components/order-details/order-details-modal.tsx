import {FC, useCallback, useMemo} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Modal from "../modal/modal";
import OrderDetails from "./order-details";
import {useSelector} from "../../services/types/hooks";
import {selectOrders} from "../../services/reducers/orders";

const OrderDetailsModal: FC = () => {
    const {orderId} = useParams()
    const navigate = useNavigate()
    const orders = useSelector(selectOrders)
    const selectedOrder = useMemo(() => (
        orders.find((order) => order._id === orderId)
    ), [orders, orderId])

    const removeSelectedOrder = useCallback(() => {
        navigate(-1)
    }, [navigate])

    return selectedOrder ? (
        <Modal
            handleClose={removeSelectedOrder}
            titleElement={<p className="text text_type_digits-default">{`#${selectedOrder.number}`}</p>}
        >
            <OrderDetails isModal/>
        </Modal>
    ) : (<></>)
}

export default OrderDetailsModal