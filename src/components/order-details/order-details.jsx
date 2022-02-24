import doneImg from "../../images/done.svg"
import styles from "./order-details.module.css"
import PropTypes from "prop-types";

const OrderDetails = ({title, subTitle, mainText, subText}) => {
    return (
        <section className={`${styles.section} mt-4 mb-15`}>
            <h2 className="text text_type_digits-large mb-8">{title}</h2>
            <h3 className="text text_type_main-medium mb-15">{subTitle}</h3>
            <img src={doneImg} alt="done-img" className="mb-15"/>
            <p className="text text_type_main-default mb-2">{mainText}</p>
            <p className="text text_type_main-default text_color_inactive">{subText}</p>
        </section>
    )
}

OrderDetails.propsTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    mainText: PropTypes.string.isRequired,
    subText: PropTypes.string.isRequired
}

export default OrderDetails
