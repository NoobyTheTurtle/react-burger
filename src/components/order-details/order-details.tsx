import doneImg from "../../images/done.svg"
import styles from "./order-details.module.css"
import {FC} from "react";

type TOrderDetails = {
    title: number
}

const OrderDetails: FC<TOrderDetails> = ({title}) => {
    return (
        <section className={`${styles.section} mt-4 mb-15`}>
            <h2 className="text text_type_digits-large mb-8">{title}</h2>
            <h3 className="text text_type_main-medium mb-15">индетификатор заказа</h3>
            <img src={doneImg} alt="done-img" className="mb-15"/>
            <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной
                станции</p>
        </section>
    )
}

export default OrderDetails
