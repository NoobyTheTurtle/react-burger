import {Link} from "react-router-dom";
import styles from './not-found-404.module.css'

const NotFound404 = () => {
    return (
        <section className={styles.section}>
            <h1 className={"text text_type_main-medium"}>Страница не найдена. Ошибка 404</h1>
            <div className={"mt-8"}>
                <span
                    className={"text text_type_main-default text_color_inactive"}>Вернуться на главную страницу?</span>
                <Link to={"/"} className={`${styles.link} text text_type_main-default ml-2`}>Перейти</Link>
            </div>
        </section>
    )
}

export default NotFound404