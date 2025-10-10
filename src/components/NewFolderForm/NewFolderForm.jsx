import {useState} from "react";
import {useAddFolderMutation} from "../../redux/folders/folderOperations.js";
import styles from "./newFolderForm.module.css";
import {useParams} from "react-router-dom";

export const NewFolderForm = ({togglemodal}) => {
    const {id} = useParams();
    const [folder, setFolder] = useState("");
    const [addFolder] = useAddFolderMutation();
    const handleInputChange = (evt) => {
        setFolder(evt.target.value);
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await addFolder({
            name: folder,
            courseModuleId: id,
        })
        setFolder("");
        togglemodal();
    }
    return (<form className={styles.form} onSubmit={handleSubmit}>
        <input className={styles.input} type = "text" placeholder="Enter a folder name..." value={folder} onChange={handleInputChange} />
        <button className={styles.button} type = "submit">Save</button>
    </form>)
}