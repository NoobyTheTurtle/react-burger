import {useState} from "react";

const useFormData = (initialState = {}) => {
    const [formData, setFormData] = useState(initialState)

    const onChangeInput = (e) => {
        setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    return {onChangeInput, formData, setFormData}
}

export default useFormData