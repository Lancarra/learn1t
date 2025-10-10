import { useParams } from 'react-router-dom';
import { useGetDictionariesQuery } from "../../redux/dictionary/dictionaryOperations.js";
import styles from "../Dashboard/dashboard.module.css";
import { Modal } from "../../components/Modal/Modal.jsx";
import { useState } from "react";
import { ItemCard } from "../../components/ItemCard/ItemCard.jsx";
import {NewDictionaryForm} from "../../components/NewDictionaryForm/NewDictionaryForm.jsx";

export const FolderPage = () => {
    const { id } = useParams();
    const { data } = useGetDictionariesQuery(id);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isShow, setIsShow] = useState(false);

    const toggleShow = () => setIsShow(!isShow);
    const toggleModal = () => setIsOpenModal(!isOpenModal);

    const [keyWord, setKeyWord] = useState("");
    const handleInputChange = (e) => {
        setKeyWord(e.target.value);
    }
    const dictionary = data?.dictionary?.filter(({name})=>name.toLowerCase().includes(keyWord.toLowerCase()))


    return (
        <>
            <div className={styles["dashboard-page"]}>
                <h1 className={styles["dashboard-greeting"]}>Here are your dictionaries.</h1>
                <button type="button" onClick={toggleModal}>Create new dictionary</button>
                <button type="button" onClick={toggleShow} >Find a dictionary</button>
                {isShow && (
                    <input
                        value ={keyWord} onChange={handleInputChange}
                        className={styles.searchInput}
                        type="text"
                        placeholder="Enter a dictionary name..."
                    />
                )}
            </div>

            <ul className={styles["modules-grid"]}>
                {dictionary?.map(({ name, id }) => (
                    <ItemCard key={id} id={id} name={name} routeBase="dictionary" />
                ))}
            </ul>
      {isOpenModal && (
        <Modal toggleModal={toggleModal} title="Create dictionary">
          <NewDictionaryForm togglemodal={toggleModal} />
        </Modal>
      )}
        </>
    );
};
