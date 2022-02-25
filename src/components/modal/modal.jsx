import styles from "./modal.module.css"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ModalOverlay from "./modal-overlay/modal-overlay";
import {useEffect} from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal-root");

const Modal = ({title, children, handleClose}) => {

    useEffect(() => {
        const onKeydown = ({key}) => {
            if (key === 'Escape') {
                handleClose()
            }
        }

        document.addEventListener("keydown", onKeydown)
        return () => document.removeEventListener("keydown", onKeydown)
    }, [handleClose])

    return ReactDOM.createPortal(
        (<>
            <div className={`${styles.modal} pr-10 pl-10 pt-10 pb-15`} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <button onClick={handleClose} className={styles.button}>
                        <CloseIcon type="primary"/>
                    </button>
                    {title && (<h2 className="text text text_type_main-large">{title}</h2>)}
                </div>
                {children}
            </div>
            <ModalOverlay onClose={handleClose}/>
        </>),
        modalRoot
    )
}

Modal.propsType = {
    title: PropTypes.string,
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
}

export default Modal