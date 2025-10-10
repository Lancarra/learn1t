import {useState} from "react";
import {useAddDefinitionMutation} from "../../redux/definitionList/definitionaList.js";

export const NewDefinitionForm = ({togglemodal, id}) => {
    const [word, setWord] = useState("");
    const [image, setImage] = useState("");
    const [meaning, setMeaning] = useState("");
    const [addDefinition] = useAddDefinitionMutation();

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

    return <form onSubmit={handleSubmit}>
        <p>Create Definition</p>
        <input type="text" name="image" value={image} onChange={handleChange} />
        <input type="text" name="word" value={word} onChange={handleChange} />
        <input type="text" name="meaning" value={meaning} onChange={handleChange} />
        <button type="submit">Save</button>
    </form>
}

