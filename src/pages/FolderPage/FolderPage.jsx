import { useParams } from 'react-router-dom';
import { useGetDictionariesQuery } from "../../redux/dictionary/dictionaryOperations.js";
import styles from "./folderPage.module.css";
import { Modal } from "../../components/Modal/Modal.jsx";
import { useState } from "react";
import { ItemCard } from "../../components/ItemCard/ItemCard.jsx";
import {NewDictionaryForm} from "../../components/NewDictionaryForm/NewDictionaryForm.jsx";
import {CiSearch} from "react-icons/ci";
import {useAuth} from "../../hooks/useAuth.js";

export const FolderPage = () => {
    const { id } = useParams();
    const { data } = useGetDictionariesQuery(id);
    const { user:{roleName, name} } = useAuth();

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
                <div className={styles.container}>
                    <h1 className={styles["dashboard-greeting"]}>Here are your dictionaries.</h1>
                    <p className={styles["header-subtitle"]}>
                        Create and manage your vocabulary dictionaries for this folder.
                    </p>
                    <div className={styles["action-bar"]}>
                        <div className={styles["action-right"]}>
                            {roleName !== "Student" && (
                            <button type="button" onClick={toggleModal}>Create new dictionary</button>)}
                            <div className={styles["search-wrapper"]}>
                                <CiSearch className={styles.searchIcon} />
                                <input value={keyWord} onChange={handleInputChange} className={styles.searchInput} type="text" placeholder="Search a dictionary name..."/>
                            </div>
                        </div>
                    </div>

                    <ul className={styles["modules-grid"]}>
                        {dictionary?.map(({ name, id }) => (
                            <ItemCard key={id} id={id} name={name} routeBase="dictionary" /> ))}
                    </ul>

                    {isOpenModal && (
                        <Modal toggleModal={toggleModal} >
                            <NewDictionaryForm togglemodal={toggleModal} title="Create dictionary" />
                        </Modal>
                    )}
                </div>
            </div>
        </>
    );
};
