import styles from "../../pages/DictionaryPage/dictionaryPage.module.css";
import {useState} from "react";
import {useDeleteDefinitionMutation} from "../../redux/definitionList/definitionaList.js";
import {Modal} from "../Modal/Modal.jsx";
import {ChangeDefinitionForm} from "../ChangeDefinitionForm/ChangeDefinitionForm.jsx";
import SpeakWeb from "../SpeakWeb/SpeakWeb.jsx";

export const DictionaryCardItem = ({id, word, meaning, imageURL, blobId}) => {
    const [isShowButton, setIsShowButton] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const toggleShowBtn = () => setIsShowButton(!isShowButton);
    const toggleShowModal = () => setIsShowModal(!isShowModal);
    const [deleteDefinition] = useDeleteDefinitionMutation();

    const handleDelete = () => {
        deleteDefinition({ id });
    };

    const imgSrc =
        imageURL ||
        (blobId ? `http://127.0.0.1:10000/devstoreaccount1/definition-images/${blobId}` : null);

    return (
        <>
            <li className={styles.dictRow}>
                {imgSrc ? (
                    <img src={imgSrc} alt={word} className={styles.dictThumb} />
                ) : (
                    <div className={styles.dictThumbPlaceholder} />
                    )}

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
                    <ChangeDefinitionForm togglemodal={toggleShowModal} wordId={id} name={word} img={imageURL} mean={meaning} blobId={blobId}/>
                </Modal>
            )}
        </>
    );
};
