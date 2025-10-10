import {useState} from "react";
import styles from "./changeDictionaryForm.module.css";
import {useAuth} from "../../hooks/useAuth.js";
import {useUpdateDictionaryMutation} from "../../redux/dictionary/dictionaryOperations.js";

export const ChangeDictionaryForm = ({togglemodal, id, name}) => {
    const [dictionary, setDictionary] = useState(name);
    const [updateDictionary] = useUpdateDictionaryMutation();
    const {user} = useAuth();
    const handleInputChange = (evt) => {
        setDictionary(evt.target.value);
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await updateDictionary({
            id: id,
            name: dictionary,
            userId: +user.userId,
        })
        setDictionary("");
        togglemodal();
    }
    return (<form className={styles.form} onSubmit={handleSubmit}>
        <h3>Change Dictionary</h3>
        <input className={styles.input} type = "text" placeholder="Edit a dictionary name..." value={dictionary} onChange={handleInputChange} />
        <button className={styles.button} type = "submit">Save</button>
    </form>)
}