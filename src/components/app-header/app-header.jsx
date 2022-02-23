import style from './app-header.module.css'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import NavItemContent from "./nav-item-content/nav-item-content";

const AppHeader = () => {
    return (
        <header>
            <nav className={`${style.header} pt-4 pb-4`}>
                <div className={style.left}>
                    <NavItemContent text="Конструктор" Icon={BurgerIcon} active/>
                    <div className="ml-2">
                        <NavItemContent text="Лента заказов" Icon={ListIcon}/>
                    </div>
                </div>
                <div className={style.navItem}>
                    <Logo/>
                </div>
                <div className={style.navItem}>
                    <NavItemContent text="Личный кабинет" Icon={ProfileIcon}/>
                </div>
            </nav>
        </header>
    )
}

export default AppHeader