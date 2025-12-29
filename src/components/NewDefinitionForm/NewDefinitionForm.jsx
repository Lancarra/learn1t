import {useState} from "react";
import {useAddDefinitionImageMutation, useAddDefinitionMutation} from "../../redux/definitionList/definitionaList.js";
import styles from "../NewModuleForm/newModuleForm.module.css";

export const NewDefinitionForm = ({togglemodal, id, title}) => {
    const [word, setWord] = useState("");
    const [image, setImage] = useState("");
    const [meaning, setMeaning] = useState("");
    const [addDefinition] = useAddDefinitionMutation();
    const [updateImage] = useAddDefinitionImageMutation();
    const [definition, setDefinition] = useState(null);

    const handleChange = (evt) => {
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDefinition({word, meaning, dictionaryId:id, imageURL:image});
        togglemodal();
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>{title}</h2>

            <input className={styles.input} type="text" name="image" value={image} onChange={handleChange} placeholder="Image URL (optional)…"/>
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
            <input className={styles.input} type="text" name="word" value={word} onChange={handleChange} placeholder="Enter a word..."/>
            <input className={styles.input} type="text" name="meaning" value={meaning} onChange={handleChange} placeholder="Enter a meaning..."/>

            <button className={styles.button} type="submit">Save</button>
        </form>
    );
};

