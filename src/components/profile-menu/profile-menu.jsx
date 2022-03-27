import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "../../services/actions/auth";
import styles from "./profile-menu.module.css";
import {selectAuthIsRequesting} from "../../services/reducers/auth";

const ProfileMenu = () => {
    const isRequesting = useSelector(selectAuthIsRequesting)
    const dispatch = useDispatch()
    const onLogout = () => {
        dispatch(logoutThunk())
    }

    return (
        <nav className={styles.nav}>
            <NavLink
                to={""}
                className={({isActive}) =>
                    `${styles.navLink} ${isActive && styles.active}`
                }
                end
            >
                <p className={`text text_type_main-medium text_color_inactive`}>
                    Профиль
                </p>
            </NavLink>
            <NavLink to={"orders"} className={({isActive}) =>
                `${styles.navLink} ${isActive && styles.active}`
            }>
                <p className={`text text_type_main-medium text_color_inactive`}>
                    История заказов
                </p>
            </NavLink>
            <button
                onClick={onLogout}
                className={styles.button}
                disabled={isRequesting}
            >
                <p className={`text text_type_main-medium text_color_inactive`}>
                    Выход
                </p>
            </button>
            <span className={`${styles.info} text text_type_main-default text_color_inactive mt-20`}>
                В этом разделе вы можете изменить свои персональные данные
            </span>
        </nav>
    )
}

export default ProfileMenu