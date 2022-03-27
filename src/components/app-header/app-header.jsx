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
                    <NavItemContent text="Конструктор" Icon={BurgerIcon} to={"/"}/>
                    <div className="ml-2">
                        <NavItemContent text="Лента заказов" Icon={ListIcon} to={"/orders"}/>
                    </div>
                </div>
                <div className={style.navItem}>
                    <Link to={"/"}>
                        <Logo/>
                    </Link>
                </div>
                <div className={style.navItem}>
                    <NavItemContent
                        to="/profile"
                        text={user.name ? user.name : "Личный кабинет"}
                        Icon={ProfileIcon}
                    />
                </div>
            </nav>
        </header>
    )
}

export default AppHeader