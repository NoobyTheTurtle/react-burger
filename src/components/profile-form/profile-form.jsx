import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import useFormData from "../../utils/hooks/use-form-data";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../services/reducers/auth";
import {updateUserThunk} from "../../services/actions/auth";
import styles from "./profile-form.module.css";
import {useEffect, useMemo, useState} from "react";

const ProfileForm = () => {
    const dispatch = useDispatch()
    const [hasChange, setHasChange] = useState(false)
    const user = useSelector(selectUser)
    const initialUser = useMemo(() => ({
        ...user,
        password: ''
    }), [user])
    const {formData, onChangeInput, setFormData} = useFormData(initialUser)

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUserThunk(formData))
    }

    const onCancel = (e) => {
        e.preventDefault()
        setFormData(initialUser)
    }

    useEffect(() => {
        setHasChange(JSON.stringify(formData) !== JSON.stringify(initialUser))
    }, [formData, initialUser])

    return (
        <form onSubmit={onSubmit} className={`ml-15 ${styles.form}`}>
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
            <PasswordInput onChange={onChangeInput} value={formData.password} name={'password'}/>
            {hasChange &&
                <div className={styles.buttons}>
                    <Button type="primary" size="medium">Сохранить</Button>
                    <Button
                        type={"secondary"}
                        size={"medium"}
                        onClick={onCancel}
                    >
                        Отмена
                    </Button>
                </div>
            }
        </form>
    )
}

export default ProfileForm