import {NavLink, useParams} from 'react-router-dom';
import {useGetFoldersQuery} from "../../redux/folders/folderOperations.js";
import styles from "./modulePage.module.css";
import {Modal} from "../../components/Modal/Modal.jsx";
import {NewFolderForm} from "../../components/NewFolderForm/NewFolderForm.jsx";
import {useState} from "react";
import {ItemCard} from "../../components/ItemCard/ItemCard.jsx";
import {useLocation} from "react-router-dom";

export const ModulePage = () => {
    const {pathname} = useLocation();
    const pathName = pathname.split("/");
    const {id} = useParams();
    const {data} = useGetFoldersQuery(id);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const toggleShow = () => {
        setIsShow(!isShow);
    }
    const toggleModal = () => {
        setIsOpenModal(!isOpenModal);
    }

    const [keyWord, setKeyWord] = useState("");
    const handleInputChange = (e) => {
        setKeyWord(e.target.value);
    }
    const folders = data?.folders.filter(({name})=>name.toLowerCase().includes(keyWord.toLowerCase()))
    return<>
        <p>
            {pathName.slice(0,3).join("/")}
    </p>
        <div className={styles["dashboard-page"]}>
        <h1 className={styles["dashboard-greeting"]}>Here are your folders. </h1>
        <button type = "button" onClick={toggleModal}>Create new folder</button>
        <button type = "button" onClick={toggleShow}>Find a folder</button>
        {isShow && <input value ={keyWord} onChange={handleInputChange} className={styles.searchInput} type = "text" placeholder="Enter a folder name..."/>}
    </div>
        <ul className={styles["modules-grid"]}>
            {folders?.map(({ name, id }) => (
                <ItemCard key={id} id={id} name={name} routeBase="folder" />
            ))}
        </ul>
        {isOpenModal && <Modal toggleModal={toggleModal} title="Create folder"><NewFolderForm togglemodal={toggleModal}/></Modal>}
    </>
}


