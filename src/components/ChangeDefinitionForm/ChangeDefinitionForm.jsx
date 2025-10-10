import {useState} from "react";
import {useAuth} from "../../hooks/useAuth.js";
import {useUpdateDefinitionMutation} from "../../redux/definitionList/definitionaList.js";
import styles from "../ChangeDictionaryForm/changeDictionaryForm.module.css";

export const ChangeDefinitionForm = ({togglemodal, id, name, img, mean, title}) => {
    const [word, setWord] = useState(name);
    const [image, setImage] = useState(img);
    const [meaning, setMeaning] = useState(mean);
    const [updateDefinition] = useUpdateDefinitionMutation();
    const {user} = useAuth();
    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        switch (name) {
            case "image":
                setImage(value);
                return;
            case "word":
                setWord(value);
                return;
            case "meaning":
                setMeaning(value);
                return;
            default:
                return;
        }
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await updateDefinition({
            id: id,
            name: word,
            userId: +user.userId,
        })
        togglemodal();
    }
    return (<form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.modalTitle}>{title}</h3>
        <input className={styles.input} type = "text" name="image" placeholder="Edit image..." value={image} onChange={handleInputChange} />
        <input className={styles.input} type = "text"  name="word" placeholder="Edit a word..." value={word} onChange={handleInputChange} />
        <input className={styles.input} type = "text" name="meaning" placeholder="Edit a meaning..." value={meaning} onChange={handleInputChange} />
        <button className={styles.button} type = "submit">Save</button>
    </form>)
}
