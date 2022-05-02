import styles from "./modal.module.css"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay/modal-overlay";
import {ReactNode, useEffect, FC} from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal-root");

type TModalProps = {
    titleElement?: ReactNode,
    title?: string,
    handleClose?: () => void,
    children: ReactNode
}

const Modal: FC<TModalProps> = (props) => {
    const {title, children, handleClose, titleElement} = props

    useEffect(() => {
        if (!handleClose) return

        const onKeydown = ({key}: KeyboardEvent) => {
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
                {handleClose && (
                    <div className={styles.header}>
                        <button onClick={handleClose} className={styles.button}>
                            <CloseIcon type="primary"/>
                        </button>
                        {title && (<h2 className="text text text_type_main-large">{title}</h2>)}
                        {titleElement}
                    </div>
                )}
                {children}
            </div>
            <ModalOverlay onClose={handleClose || (() => {
            })}/>
        </>),
        modalRoot as Element
    )
}

export default Modal