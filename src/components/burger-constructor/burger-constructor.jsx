import styles from "./burger-constructor.module.css";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {burgerIngredients} from "../../utils/prop-types";
import Modal from "../modal/modal";
import {useState} from "react";
import OrderDetails from "../order-details/order-details";

const BurgerConstructor = ({ingredients}) => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <section className={`${styles.section} pt-25 ml-10`}>
            <ul className={`${styles.ul}`}>
                <li className={`${styles.li} pl-8 mr-4`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${ingredients[0].name} (верх)`}
                        price={ingredients[0].price}
                        thumbnail={ingredients[0].image_mobile}
                    />
                </li>
                <div className={`${styles.ingredients}`}>
                    {
                        ingredients.slice(1, -1).map((item) => (
                            <li className={`${styles.li} mt-4 mb-4 mr-2`} key={item._id}>
                                <div className={styles.icon}>
                                    <DragIcon type="primary"/>
                                </div>
                                <ConstructorElement
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image_mobile}
                                />
                            </li>
                        ))
                    }
                </div>
                <li className={`${styles.li} pl-8 mr-4`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${ingredients[0].name} (низ)`}
                        price={ingredients[0].price}
                        thumbnail={ingredients[0].image_mobile}
                    />
                </li>
                <div className={`${styles.placeOrder} mt-10`}>
                    <div className={`text text_type_digits-medium mr-10 ${styles.fullPrice}`}>
                        610
                        <div className={`${styles.currencyIcon} ml-2`}>
                            <CurrencyIcon type="primary"/>
                        </div>
                    </div>
                    <Button type="primary" size="large" onClick={() => setModalOpen(true)}>
                        Оформить заказ
                    </Button>
                    {modalOpen && (
                        <Modal handleClose={() => setModalOpen(false)}>
                            <OrderDetails
                                title={"034546"}
                                subTitle={"индетификатор заказа"}
                                mainText={"Ваш заказ начали готовить"}
                                subText={"Дождитесь готовности на орбитальной станции"}
                            />
                        </Modal>
                    )}
                </div>
            </ul>
        </section>
    )
}

BurgerConstructor.propTypes = {
    ingredients: burgerIngredients
}

export default BurgerConstructor