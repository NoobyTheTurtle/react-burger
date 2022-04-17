import styles from "./modal-overlay.module.css"
import {FC} from "react";

type TModalOverlayProps = {
    onClose: () => void
}

const ModalOverlay: FC<TModalOverlayProps> = ({onClose}) => {
    return (
        <div className={styles.modalOverlay} onClick={onClose}/>
    )
}

export default ModalOverlay