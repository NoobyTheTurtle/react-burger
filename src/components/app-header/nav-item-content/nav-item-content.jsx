import styles from "./nav-item-content.module.css"
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";

const NavItemContent = ({text, Icon, to}) => {
    return (
        <NavLink
            to={to}
            className={({isActive}) =>
                `${styles.item} pl-5 pr-5 pt-4 pb-4 ${isActive && styles.active}`
            }
        >
            <Icon type={'secondary'}/>
            <p className={`text text_type_main-default ml-2 text_color_inactive ${styles.text}`}>
                {text}
            </p>
        </NavLink>
    )
}

NavItemContent.propTypes = {
    text: PropTypes.string.isRequired,
    Icon: PropTypes.func.isRequired,
    to: PropTypes.string.isRequired
}

export default NavItemContent