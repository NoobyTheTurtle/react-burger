import styles from "./nav-item-content.module.css"
import {NavLink} from "react-router-dom";
import {FC, ReactNode} from "react";

type TNavItemContentProps = {
    text: string,
    to: string,
    children: ReactNode
}

const NavItemContent: FC<TNavItemContentProps> = ({text, to, children}) => {
    return (
        <NavLink
            to={to}
            className={({isActive}) =>
                `${styles.item} pl-5 pr-5 pt-4 pb-4 ${isActive && styles.active}`
            }
        >
            {children}
            <p className={`text text_type_main-default ml-2 text_color_inactive ${styles.text}`}>
                {text}
            </p>
        </NavLink>
    )
}

export default NavItemContent