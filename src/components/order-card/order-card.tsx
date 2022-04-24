import {FC, useMemo} from "react";
import {TOrder} from "../../services/types/order";
import styles from "./order-card.module.css"
import {selectOrderIngredients} from "../../services/reducers/orders";
import {useSelector} from "../../services/types/hooks";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import dateFormat from "../../utils/date-format";

type TOrderCardProps = {
    order: TOrder
    isStatus?: boolean
}

const orderStatus = (status: 'done' | 'created' | 'pending') => {
    switch (status) {
        case 'done':
            return 'Выполнен'
        case 'created':
            return 'Создан'
        case 'pending':
            return 'Готовится'
    }
}

const OrderCard: FC<TOrderCardProps> = ({order, isStatus= false}) => {
    const ingredients = useSelector(selectOrderIngredients(order))

    const totalPrice = useMemo(() => {
        const bun = ingredients.filter((i) => i.type === 'bun')[0]
        const priceWithoutBread = ingredients.filter((i) => i.type !== 'bun').reduce((prev, current) => prev + current.price, 0)

        return priceWithoutBread + (bun?.price || 0) * 2
    }, [ingredients])


    return (
        <li className={`${styles.li} p-6 mb-4`}>
            <div className={styles.infoOrder}>
                <span className="text text_type_digits-default">{`#${order.number}`}</span>
                <span className="text text_type_main-default text_color_inactive">{dateFormat(order.createdAt)}</span>
            </div>
            <h3 className={`${styles.h3} text text_type_main-medium mt-6`}>{order.name}</h3>
            {isStatus && <p className={`${order.status === 'done' && styles.done} text text_type_main-default mt-2`}>
                {orderStatus(order.status)}
            </p>}
            <div className={`${styles.infoIngredients} mt-6`}>
                <div className={styles.images}>
                    {ingredients.length <= 6 ? (
                        ingredients.map((i, index) => (
                            <span key={index} style={{zIndex: 10 - index}}><img src={i.image_mobile}
                                                                                alt={i.name}/></span>
                        ))) : (<>
                        {ingredients.slice(0, 5).map((i, index) => (
                            <span key={index} style={{zIndex: 10 - index}}><img src={i.image_mobile}
                                                                                alt={i.name}/></span>))}
                        <span>
                            <img src={ingredients[5].image_mobile} alt={ingredients[5].name}/>
                            <p className="text text_type_digits-default">+{ingredients.length - 6}</p>
                        </span>
                    </>)}
                </div>
                <div className={`${styles.totalPrice} ml-6 text text_type_digits-default`}>
                    {totalPrice}
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </li>
    )
}

export default OrderCard