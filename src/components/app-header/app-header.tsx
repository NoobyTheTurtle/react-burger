import style from './app-header.module.css'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import NavItemContent from "./nav-item-content/nav-item-content";
import {useSelector} from "react-redux";
import {selectUser} from "../../services/reducers/auth";
import {Link} from "react-router-dom";

const AppHeader = () => {
    const user = useSelector(selectUser)
    return (
        <header>
            <nav className={`${style.header} pt-4 pb-4`}>
                <div className={style.left}>
                    <NavItemContent text="Конструктор" to={"/"}>
                        <BurgerIcon type='secondary'/>
                    </NavItemContent>
                    <div className="ml-2">
                        <NavItemContent text="Лента заказов" to={"/orders"}>
                            <ListIcon type='secondary'/>
                        </NavItemContent>
                    </div>
                </div>
                <div className={style.navItem}>
                    <Link to={"/"}>
                        <Logo/>
                    </Link>
                </div>
                <div className={style.navItem}>
                    <NavItemContent to="/profile" text={user.name ? user.name : "Личный кабинет"}>
                        <ProfileIcon type='secondary'/>
                    </NavItemContent>
                </div>
            </nav>
        </header>
    )
}

export default AppHeader