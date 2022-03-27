import styles from './auth.module.css'
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import useFormData from "../../utils/hooks/use-form-data";
import {useDispatch, useSelector} from "react-redux";
import {selectAuthIsRequesting} from "../../services/reducers/auth";
import {forgotPasswordThunk} from "../../services/actions/auth";

const ForgotPassword = () => {
    const isRequesting = useSelector(selectAuthIsRequesting)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {formData, onChangeInput} = useFormData({
        email: ''
    })

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(forgotPasswordThunk(formData, navigate))
    }

    return (
        <section className={styles.section}>
            <h1 className={"text text_type_main-medium"}>Восстановление пароля</h1>
            <form
                onSubmit={onSubmit}
                className={`pb-20 ${styles.form}`}
            >
                <Input
                    type={'email'}
                    placeholder={'Укажите e-mail'}
                    onChange={onChangeInput}
                    value={formData.email}
                    name={'email'}
                    size={'default'}
                />
                <Button
                    type="primary"
                    size="medium"
                    disabled={isRequesting}
                >Восстановить</Button>
            </form>
            <div className={"mt-4"}>
                <span className={"text text_type_main-default text_color_inactive"}>Вспомнили пароль?</span>
                <Link to={"/login"} className={`${styles.link} text text_type_main-default ml-2`}>Войти</Link>
            </div>
        </section>
    )
}

export default ForgotPassword