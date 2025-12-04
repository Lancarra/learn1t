import {useEffect} from "react";
import styles from "./modal.module.css";

export const Modal = ({children, toggleModal}) => {
    useEffect(() => {
        const closeByEscape = (evt) => {
            if (evt.code === "Escape") {
                toggleModal();
            }
        }
        document.addEventListener("keydown", closeByEscape);
        return () => {
            document.removeEventListener("keydown", closeByEscape);
        }
    },[]);
    const closedByClick = (e) => {
        if (e.target === e.currentTarget) {
            toggleModal();
        }
    }
    return<div className={styles.backdrop}>
        <div className={styles.modal}>
            {children}
            <button type = "button" onClick={toggleModal}>x</button>
        </div>
    </div>
}
