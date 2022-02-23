import styles from "./nav-item-content.module.css"
import PropTypes from "prop-types";

const NavItemContent = ({text, Icon, active}) => {
    return (
        <div className={`${styles.item} pl-5 pr-5 pt-4 pb-4`}>
            <Icon type={active ? 'primary' : 'secondary'}/>
            <p className={`text text_type_main-default ml-2 ${active ? '' : 'text_color_inactive'} ${styles.text}`}>
                {text}
            </p>
        </div>
    )
}

NavItemContent.propTypes = {
    text: PropTypes.string,
    Icon: PropTypes.func,
    active: PropTypes.bool
}

export default NavItemContent