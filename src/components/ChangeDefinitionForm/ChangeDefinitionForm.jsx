import {useState} from "react";
import {useAuth} from "../../hooks/useAuth.js";
import {useUpdateDefinitionMutation, useAddDefinitionImageMutation} from "../../redux/definitionList/definitionaList.js";
import styles from "../ChangeDictionaryForm/changeDictionaryForm.module.css";
import {useParams} from "react-router-dom";

export const ChangeDefinitionForm = ({togglemodal, wordId, name, img, mean, title, blobId}) => {
    const { id } = useParams();
    const [word, setWord] = useState(name);
    const [image, setImage] = useState(img);
    const [meaning, setMeaning] = useState(mean);
    const [updateDefinition] = useUpdateDefinitionMutation();
    const [updateImage] = useAddDefinitionImageMutation();
    const [definition, setDefinition] = useState(null);
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
            id: wordId,
            word: word,
            meaning: meaning,
/*
            userId: +user.userId,
*/
            blobId: blobId,
            dictionaryId: id,
            imageURL: img
        })
        togglemodal();
    }
    return (<form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.modalTitle}>{title}</h3>
        <input className={styles.input} type = "text" name="image" placeholder="Edit image..." value={image} onChange={handleInputChange} />
        <input className={styles.input} type="file" accept="image/*, .png, .jpg, .jpeg, .webp" onChange={(e) => {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("file", file);
            updateImage(
                {id: id, file: formData}
            )
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setDefinition(reader.result);
                reader.readAsDataURL(file);

            }
        }} />
        <input className={styles.input} type = "text"  name="word" placeholder="Edit a word..." value={word} onChange={handleInputChange} />
        <input className={styles.input} type = "text" name="meaning" placeholder="Edit a meaning..." value={meaning} onChange={handleInputChange} />
        <button className={styles.button} type = "submit">Save</button>
    </form>)
}
