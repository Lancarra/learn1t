import styles from "../../pages/DictionaryPage/dictionaryPage.module.css";
import {useState} from "react";
import {useDeleteDefinitionMutation} from "../../redux/definitionList/definitionaList.js";
import {Modal} from "../Modal/Modal.jsx";
import {ChangeDefinitionForm} from "../ChangeDefinitionForm/ChangeDefinitionForm.jsx";

export const DictionaryCardItem = ({id, word, meaning, imageURL, blobId}) => {
    const [isShowButton, setIsShowButton] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const toggleShowBtn = () => setIsShowButton(!isShowButton);
    const toggleShowModal = () => setIsShowModal(!isShowModal);
    const [deleteDefinition] = useDeleteDefinitionMutation();

    const handleDelete = () => {
      deleteDefinition({id});
    }

    return <>
        <li className={styles.dictRow}>
        <img src={imageURL || blobId} alt={word} className={styles.dictThumb} />
        <p className={styles.dictWord}>{word}</p>
        <p className={styles.dictMeaning}>{meaning}</p>
            <div className={styles["dropdown"]}>
                <button className={styles["dropdown-toggle"]} onClick={toggleShowBtn}>⋯</button>
                {isShowButton && (
                    <div className={styles["dropdown-menu"]}>
                        <button type="button" onClick={toggleShowModal}>Edit</button>
                        <button type="button" onClick={handleDelete}>Delete</button>
                    </div>
                )}
            </div>
    </li>
        {isShowModal && (
            <Modal toggleModal={toggleShowModal}>
                <ChangeDefinitionForm togglemodal={toggleShowModal} id={id} name={word} img={imageURL} mean={meaning} />
            </Modal>
        )}
    </>
}