import styles from "./modal-overlay.module.css"
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal-root");

const ModalOverlay = ({onClose, children}) => {
    return ReactDOM.createPortal(
        (<div
            className={styles.modalOverlay}
            onClick={onClose}
        >
            {children}
        </div>),
        modalRoot
    )

}

ModalOverlay.propsType = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
}

export default ModalOverlay