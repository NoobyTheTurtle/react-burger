import styles from './auth.module.css'
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import useFormData from "../../utils/hooks/use-form-data";
import {useDispatch, useSelector} from "react-redux";
import {resetPasswordThunk} from "../../services/actions/auth";
import {selectAuthIsRequesting} from "../../services/reducers/auth";

const ResetPassword = () => {
    const isRequesting = useSelector(selectAuthIsRequesting)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const passwordRef = useRef(null)
    const {formData, onChangeInput} = useFormData({
        password: '',
        token: ''
    })

    const [passwordInputOptions, setPasswordInputOptions] = useState({
        icon: 'ShowIcon',
        type: 'password'
    })

    const onPasswordIconClick = () => {
        let options
        if (passwordInputOptions.type === 'password') {
            setTimeout(() => passwordRef.current.focus(), 0)
            options = {icon: 'HideIcon', type: 'text'}
        } else {
            options = {icon: 'ShowIcon', type: 'password'}
        }
        setPasswordInputOptions(options)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(resetPasswordThunk(formData, navigate))
    }

    if (!location.state || (location.state?.from !== '/forgot-password')) {
        return <Navigate to={'/forgot-password'}/>
    }

    return (
        <section className={styles.section}>
            <h1 className={"text text_type_main-medium"}>Восстановление пароля</h1>
            <form
                onSubmit={onSubmit}
                className={`pb-20 ${styles.form}`}
            >
                <Input
                    type={passwordInputOptions.type}
                    placeholder={'Введите новый пароль'}
                    onChange={onChangeInput}
                    value={formData.password}
                    name={'password'}
                    size={'default'}
                    icon={passwordInputOptions.icon}
                    ref={passwordRef}
                    onIconClick={onPasswordIconClick}
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={onChangeInput}
                    value={formData.token}
                    name={'token'}
                    size={'default'}
                />
                <Button
                    type="primary"
                    size="medium"
                    disabled={isRequesting}
                >Сохранить</Button>
            </form>
            <div className={"mt-4"}>
                <span className={"text text_type_main-default text_color_inactive"}>Вспомнили пароль?</span>
                <Link to={"/login"} className={`${styles.link} text text_type_main-default ml-2`}>Войти</Link>
            </div>
        </section>
    )
}

export default ResetPassword