import React, {useState} from "react";

const useFormData = <T>(initialState: T) => {
    const [formData, setFormData] = useState<T>(initialState)

    const onChangeInput = (e: React.FormEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    return {onChangeInput, formData, setFormData}
}

export default useFormData