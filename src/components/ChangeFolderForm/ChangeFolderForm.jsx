import {useState} from "react";
import styles from "./changeFolderForm.module.css";
import {useAuth} from "../../hooks/useAuth.js";
import {useUpdateFolderMutation} from "../../redux/folders/folderOperations.js";

export const ChangeFolderForm = ({togglemodal, id, name}) => {
    const [folder, setFolder] = useState(name);
    const [updateFolder] = useUpdateFolderMutation();
    const {user} = useAuth();
    const handleInputChange = (evt) => {
        setFolder(evt.target.value);
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await updateFolder({
            id: id,
            name: folder,
            userId: +user.userId,
        })
        setFolder("");
        togglemodal();
    }
    return (<form className={styles.form} onSubmit={handleSubmit}>
        <h3 >Change Folder</h3>
        <input className={styles.input} type = "text" placeholder="Edit a folder name..." value={folder} onChange={handleInputChange} />
        <button className={styles.button} type = "submit">Save</button>
    </form>)
}