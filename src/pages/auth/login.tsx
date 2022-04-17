import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from "react-router-dom";
import styles from "./auth.module.css";
import useFormData from "../../utils/hooks/use-form-data";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "../../services/actions/auth";
import {selectAuthIsRequesting} from "../../services/reducers/auth";
import React from "react";

export type TLoginData = {
    email: string,
    password: string
}

const Login = () => {
    const dispatch = useDispatch()
    const isRequesting: boolean = useSelector(selectAuthIsRequesting)
    const {formData, onChangeInput} = useFormData<TLoginData>({
        email: '',
        password: ''
    })

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        dispatch(loginThunk(formData))
    }

    return (
        <section className={styles.section}>
            <h1 className={"text text_type_main-medium"}>Вход</h1>
            <form
                onSubmit={onSubmit}
                className={`pb-20 ${styles.form}`}
            >
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={onChangeInput}
                    value={formData.email}
                    name={'email'}
                    size={'default'}
                />
                <PasswordInput
                    onChange={onChangeInput}
                    value={formData.password}
                    name={'password'}
                />
                <Button
                    type="primary"
                    size="medium"
                    disabled={isRequesting}
                >Войти</Button>
            </form>
            <div>
                <span className={"text text_type_main-default text_color_inactive"}>Вы - новый пользователь?</span>
                <Link to={"/register"}
                      className={`${styles.link} text text_type_main-default ml-2`}>Зарегистрироваться</Link>
            </div>
            <div className={"mt-4"}>
                <span className={"text text_type_main-default text_color_inactive"}>Забыли пароль?</span>
                <Link to={"/forgot-password"} className={`${styles.link} text text_type_main-default ml-2`}>Восстановить
                    пароль</Link>
            </div>
        </section>
    )
}

export default Login