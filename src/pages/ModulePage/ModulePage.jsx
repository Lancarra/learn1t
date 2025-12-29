import {NavLink, useParams} from 'react-router-dom';
import {useGetFoldersQuery} from "../../redux/folders/folderOperations.js";
import styles from "./modulePage.module.css";
import {Modal} from "../../components/Modal/Modal.jsx";
import {NewFolderForm} from "../../components/NewFolderForm/NewFolderForm.jsx";
import {useState} from "react";
import {ItemCard} from "../../components/ItemCard/ItemCard.jsx";
import {useLocation} from "react-router-dom";
import {CiSearch} from "react-icons/ci";
import {useAuth} from "../../hooks/useAuth.js";

export const ModulePage = () => {
    const {pathname} = useLocation();
    const pathName = pathname.split("/");
    const {id} = useParams();
    const {data} = useGetFoldersQuery(id);
    const { user:{roleName} } = useAuth();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isShow] = useState(false);

    const toggleModal = () => {
        setIsOpenModal(!isOpenModal);
    }

    const [keyWord, setKeyWord] = useState("");
    const handleInputChange = (e) => {
        setKeyWord(e.target.value);
    }

    const folders = data?.folders.filter(({name})=>name.toLowerCase().includes(keyWord.toLowerCase()))

    return<>
        <div className={styles["dashboard-page"]}>
            <div className={styles.container}>
                <h1 className={styles["dashboard-greeting"]}>Here are your folders.</h1>
                <p className={styles["header-subtitle"]}>
                    Organize your learning materials and access your content anytime.
                </p>
                <div className={styles["action-bar"]}>
                    <div className={styles["action-right"]}>
                        {roleName !== "Student" && (
                            <button type = "button" onClick={toggleModal}>Create new folder</button>)}
                            <div className={styles["search-wrapper"]}>
                                <CiSearch className={styles.searchIcon}/>
                                <input value={keyWord} onChange={handleInputChange} className={styles.searchInput} type="text" placeholder="Search a folder name..."/>
                            </div>
                    </div>
                </div>
                {isShow && (
                    <div className={styles["search-wrapper"]}>
                        <input value ={keyWord} onChange={handleInputChange} className={styles.searchInput} type = "text" placeholder="Enter a folder name..."/> </div>
                )}

            <ul className={styles["modules-grid"]}>
                {folders?.map(({ name, id }) => (
                    <ItemCard key={id} id={id} name={name} routeBase="folder" />
                ))}
            </ul>
            {isOpenModal && <Modal toggleModal={toggleModal} >
                <NewFolderForm togglemodal={toggleModal}  title="Create folder"/>
            </Modal>}

            </div>
        </div>
    </>
}


