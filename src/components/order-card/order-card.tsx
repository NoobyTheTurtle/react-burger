import {FC, useMemo} from "react";
import {TOrder} from "../../services/types/order";
import styles from "./order-card.module.css"
import {selectOrderIngredients} from "../../services/reducers/orders";
import {useSelector} from "../../services/types/hooks";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import dateFormat from "../../utils/date-format";
import {Link, useLocation} from "react-router-dom";
import {orderStatus, totalPrice} from "../../utils/order";

type TOrderCardProps = {
    order: TOrder
    isStatus?: boolean
}

const OrderCard: FC<TOrderCardProps> = ({order, isStatus = false}) => {
    const ingredients = useSelector(selectOrderIngredients(order))
    const location = useLocation()
    const ingredientsWithOneBun = useMemo(() => {
        const bun = ingredients.find(i => i.type === 'bun')
        if (bun)
            return [bun].concat(ingredients.filter(i => i.type !== 'bun'))
        return []
    }, [ingredients])

    return (
        <Link
            className={styles.link}
            to={{pathname: `${location.pathname}/${order._id}`}}
            state={{background: location}}
        >
            <li className={`${styles.li} p-6 mb-4`}>
                <div className={styles.infoOrder}>
                    <span className="text text_type_digits-default">{`#${order.number}`}</span>
                    <span
                        className="text text_type_main-default text_color_inactive">{dateFormat(order.createdAt)}</span>
                </div>
                <h3 className={`${styles.h3} text text_type_main-medium mt-6`}>{order.name}</h3>
                {isStatus &&
                    <p className={`${order.status === 'done' && styles.done} text text_type_main-default mt-2`}>
                        {orderStatus(order.status)}
                    </p>}
                <div className={`${styles.infoIngredients} mt-6`}>
                    <div className={styles.images}>
                        {ingredientsWithOneBun.length <= 6 ? (
                            ingredientsWithOneBun.map((i, index) => (
                                <span key={index} style={{zIndex: 10 - index}}><img src={i.image_mobile}
                                                                                    alt={i.name}/></span>
                            ))) : (<>
                            {ingredientsWithOneBun.slice(0, 5).map((i, index) => (
                                <span key={index} style={{zIndex: 10 - index}}><img src={i.image_mobile}
                                                                                    alt={i.name}/></span>))}
                            <span>
                            <img src={ingredientsWithOneBun[5].image_mobile} alt={ingredientsWithOneBun[5].name}/>
                            <p className="text text_type_digits-default">+{ingredientsWithOneBun.length - 6}</p>
                        </span>
                        </>)}
                    </div>
                    <div className={`${styles.totalPrice} ml-6 text text_type_digits-default`}>
                        {totalPrice(ingredients)}
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </li>
        </Link>
    )
}

export default OrderCard