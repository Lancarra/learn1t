import styles from "./dashboard.module.css";
import {useAuth} from "../../hooks/useAuth.js"
import {useState} from "react";
import {Modal} from "../../components/Modal/Modal.jsx";
import {NewModuleForm} from "../../components/NewModuleForm/NewModuleForm.jsx";
import {useGetModulesQuery} from "../../redux/modules/moduleOperations.js";
import { ItemCard } from "../../components/ItemCard/ItemCard.jsx";
import {CiSearch} from "react-icons/ci";

export const Dashboard = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const { user:{roleName, name} } = useAuth();
    const [isShow, setIsShow] = useState(false);
    const { data } = useGetModulesQuery();
    const [keyWord, setKeyWord] = useState("");
    const toggleShow = () => setIsShow(!isShow);
    const toggleModal = () => setIsOpenModal(!isOpenModal);
    const handleInputChange = (e) => {
        setKeyWord(e.target.value);
    }

    const modules = data?.modules.filter(({name})=>name.toLowerCase().includes(keyWord.toLowerCase()))

    return (
        <>
            <div className={styles["dashboard-page"]}>
                <div className={styles.container}>
                <h1 className={styles["dashboard-greeting"]}>Glad to see you, {name}. Here are your modules.</h1>

                <div className={styles["action-bar"]}>
                    <div className={styles["action-right"]}>
                        {roleName === "Admin" && (
                            <button type="button" onClick={toggleModal}>
                                Create new module
                            </button>
                        )}
                        {roleName === "Admin;" && (
                            <button type="button" onClick={toggleModal}>
                                Create new module
                            </button>
                        )}
                        {roleName === "Teacher" && (
                            <button type="button" onClick={toggleModal}>
                                Create new module
                            </button>
                        )}
                        {roleName === "Teacher;" && (
                            <button type="button" onClick={toggleModal}>
                                Create new module
                            </button>
                        )}


                        <div className={styles["search-wrapper"]}>
                            <CiSearch className={styles.searchIcon} />
                            <input
                                value={keyWord}
                                onChange={handleInputChange}
                                className={styles.searchInput}
                                type="text"
                                placeholder="Search a module name..."
                            />
                        </div>
                    </div>
                </div>

                <ul className={styles["modules-grid"]}>
                    {modules?.map(({ name, id }) => (
                        <ItemCard key={id} id={id} name={name} routeBase="dashboard/module" />
                    ))}
                </ul>
            </div>
            </div>

        {isOpenModal && (
            <Modal toggleModal={toggleModal} size="sm">
                <NewModuleForm togglemodal={toggleModal} title="Create module" />
            </Modal>
        )}
    </>
    );
};