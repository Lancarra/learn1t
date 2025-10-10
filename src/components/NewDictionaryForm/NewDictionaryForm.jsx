import {useState} from "react";
import styles from "./newDictionaryForm.module.css";
import {useParams} from "react-router-dom";
import {useAddDictionaryMutation} from "../../redux/dictionary/dictionaryOperations.js";

export const NewDictionaryForm = ({togglemodal}) => {
    const {id} = useParams();
    const [dictionary, setDictionary] = useState("");
    const [addDictionary] = useAddDictionaryMutation();
    const handleInputChange = (evt) => {
        setDictionary(evt.target.value);
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await addDictionary({
            name: dictionary,
            parentFolderId: id,
        })
        setDictionary("");
        togglemodal();
    }
    return (<form className={styles.form} onSubmit={handleSubmit}>
        <input className={styles.input} type = "text" placeholder="Enter a dictionary name..." value={dictionary} onChange={handleInputChange} />
        <button className={styles.button} type = "submit">Save</button>
    </form>)
}