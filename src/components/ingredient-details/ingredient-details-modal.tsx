import Homepage from "../../pages/homepage/homepage";
import Modal from "../modal/modal";
import IngredientDetails from "./ingredient-details";
import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";

const IngredientDetailsModal = () => {
    const navigate = useNavigate()

    const removeChosenIngredient = useCallback(() => {
        navigate(-1)
    }, [navigate])

    return (<>
        <Homepage/>
        <Modal
            title={"Детали ингредиента"}
            handleClose={removeChosenIngredient}
        >
            <IngredientDetails/>
        </Modal>
    </>)
}

export default IngredientDetailsModal