import styles from "./dashboard.module.css";
import {useAuth} from "../../hooks/useAuth.js"
import {useState} from "react";
import {Modal} from "../../components/Modal/Modal.jsx";
import {NewModuleForm} from "../../components/NewModuleForm/NewModuleForm.jsx";
import {useGetModulesQuery} from "../../redux/modules/moduleOperations.js";
import { ItemCard } from "../../components/ItemCard/ItemCard.jsx";
import {ChangeModuleForm} from "../../components/ChangeModuleForm/ChangeModuleForm.jsx";

export const Dashboard = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const { user } = useAuth();
    const [isShow, setIsShow] = useState(false);
    const { data } = useGetModulesQuery();
    const [keyWord, setKeyWord] = useState("");
    const toggleShow = () => setIsShow(!isShow);
    const toggleModal = () => setIsOpenModal(!isOpenModal);
    const handleInputChange = (e) => {
        setKeyWord(e.target.value);
    }
//TODO
    const modules = data?.modules.filter(({name})=>name.toLowerCase().includes(keyWord.toLowerCase()))

    return (
        <>
            <div className={styles["dashboard-page"]}>
                <h1 className={styles["dashboard-greeting"]}>Glad to see you, {user.name}. Here are your modules.</h1>

                <div className={styles["top-bar"]}>
                    <button type="button" className={styles["create-button"]} onClick={toggleModal}>Create new module</button>
                    <button type="button" className={styles["create-button"]} onClick={toggleShow}>Find a module</button>
                    {isShow && (<input value ={keyWord} onChange={handleInputChange} className={styles.searchInput} type="text" placeholder="Enter a module name..."/>
                    )}
                </div>
            </div>
            <ul className={styles["modules-grid"]}>
                {modules?.map(({ name, id }) => (
                    <ItemCard key={id} id={id} name={name} routeBase="module" />
                ))}
            </ul>
            {isOpenModal && (
                <Modal toggleModal={toggleModal} >
                    <NewModuleForm togglemodal={toggleModal} title="Create module"/>
                </Modal>
            )}
        </>
    );
};
