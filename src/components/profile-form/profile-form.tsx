import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import useFormData from "../../utils/hooks/use-form-data";
import {useDispatch, useSelector} from "../../services/types/hooks";
import {selectUser} from "../../services/reducers/auth";
import {updateUserThunk} from "../../services/actions/auth";
import styles from "./profile-form.module.css";
import React, {useEffect, useMemo, useState} from "react";
import {TProfileFormData} from "../../services/types/auth-data";

const ProfileForm = () => {
    const dispatch = useDispatch()
    const [hasChange, setHasChange] = useState<boolean>(false)
    const user = useSelector(selectUser)
    const initialUser: TProfileFormData = useMemo(() => ({
        ...user,
        password: ''
    }), [user])
    const {formData, onChangeInput, setFormData} = useFormData<TProfileFormData>(initialUser)

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        dispatch(updateUserThunk(formData))
    }

    const onCancel = (e: React.SyntheticEvent) => {
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