import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Modal } from "../Modal/Modal.jsx";
import { ChangeModuleForm } from "../ChangeModuleForm/ChangeModuleForm.jsx";
import styles from "./itemCard.module.css";
import {useDeleteModuleMutation} from "../../redux/modules/moduleOperations.js";
import {useDeleteFolderMutation} from "../../redux/folders/folderOperations.js";
import {useDeleteDictionaryMutation} from "../../redux/dictionary/dictionaryOperations.js";
import {useDeleteDefinitionMutation} from "../../redux/definitionList/definitionaList.js";
import {ChangeFolderForm} from "../ChangeFolderForm/ChangeFolderForm.jsx";
import {ChangeDictionaryForm} from "../ChangeDictionaryForm/ChangeDictionaryForm.jsx";

export const ItemCard = ({ id, name, routeBase }) => {
    const [isShowButton, setIsShowButton] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [deleteModule] = useDeleteModuleMutation();
    const [deleteDefinition] = useDeleteDefinitionMutation();
    const [deleteDictionary] = useDeleteDictionaryMutation();
    const [deleteFolder] = useDeleteFolderMutation();

    const toggleShowBtn = () => setIsShowButton(!isShowButton);
    const toggleShowModal = () => {setIsShowModal(!isShowModal)
    setIsShowButton(false)};

    const handleDelete = () => {
        switch (routeBase) {
            case "module":
                deleteModule({id});
                return;
            case "folder":
                deleteFolder(id);
                return;
            case "dictionary":
                deleteDictionary({id});
                return;
            case "definition":
                deleteDefinition({id});
                return;
            default:
                return;
        }
    }
    return (
        <li className={styles["module-card"]}>
            <div className={styles["module-header"]}>
                <NavLink to={`/${routeBase}/${id}`} className={styles["module-link"]}>
                    <div className={styles["module-info"]}>
                        <h3>{name}</h3>
                    </div>
                </NavLink>

                <div className={styles["dropdown"]}>
                    <button className={styles["dropdown-toggle"]} onClick={toggleShowBtn}>⋯</button>
                    {isShowButton && (
                        <div className={styles["dropdown-menu"]}>
                            <button type="button" onClick={toggleShowModal}>Edit</button>
                            <button type="button" onClick={handleDelete}>Delete</button>
                        </div>
                    )}
                </div>
            </div>

            {isShowModal && (
                <Modal toggleModal={toggleShowModal}>
                    {routeBase === "module" && (
                        <ChangeModuleForm togglemodal={toggleShowModal} id={id} name={name} />
                    )}
                    {routeBase === "folder" && (
                        <ChangeFolderForm togglemodal={toggleShowModal} id={id} name={name} />
                    )}
                    {routeBase === "dictionary" && (
                        <ChangeDictionaryForm togglemodal={toggleShowModal} id={id} name={name} />
                    )}
                </Modal>
            )}
        </li>
    );
};
