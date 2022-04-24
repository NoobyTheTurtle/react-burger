import styles from "./auth.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import useFormData from "../../utils/hooks/use-form-data";
import {useDispatch, useSelector} from "../../services/types/hooks";
import {registerThunk} from "../../services/actions/auth";
import {selectAuthIsRequesting} from "../../services/reducers/auth";
import React from "react";
import {TRegisterData} from "../../services/types/auth-data";

const Register = () => {
    const dispatch = useDispatch()
    const isRequesting = useSelector(selectAuthIsRequesting)
    const {formData, onChangeInput} = useFormData<TRegisterData>({
        email: '',
        password: '',
        name: ''
    })

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        dispatch(registerThunk(formData))
    }

    return (
        <section className={styles.section}>
            <h1 className={"text text_type_main-medium"}>Регистрация</h1>
            <form
                onSubmit={onSubmit}
                className={`pb-20 ${styles.form}`}
            >
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onChangeInput}
                    value={formData.name}
                    name={'name'}
                    size={'default'}
                />
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
                >Зарегистрироваться</Button>
            </form>
            <div className={"mt-4"}>
                <span className={"text text_type_main-default text_color_inactive"}>Уже зарегистрированы?</span>
                <Link to={"/login"} className={`${styles.link} text text_type_main-default ml-2`}>Войти</Link>
            </div>
        </section>
    )
}

export default Register