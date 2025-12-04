import {useState} from "react";
import {useAddModuleMutation} from "../../redux/modules/moduleOperations.js";
import {useAuth} from "../../hooks/useAuth.js"
import styles from "./newModuleForm.module.css";

const levels = ["Begginer", "Advanced"]

export const NewModuleForm = ({togglemodal, title}) => {
    const [module, setModule] = useState("");
    const [description, setDescription] = useState("");
    const [level, setLevel] = useState("");
    const [addModule] = useAddModuleMutation();
    const {user} = useAuth();
    const handleInputChange = (evt) => {
    const {name, value} = evt.target;
    switch(name) {
        case "module":
            setModule(value);
            return;
        case "description":
            setDescription(value);
            return;
        case "level":
            setLevel(value);
            return;
        default:
            return;
    }
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await addModule({
            name: module,
            description: description,
            learnLevel: level,
            userId: user.userId,
        })
        setModule("");
        togglemodal();
    }
    return (<form className={styles.form} onSubmit={handleSubmit}>
        <p>{title}</p>
        <input className={styles.input} type = "text" placeholder="Enter a module name..." name = "module" value={module} onChange={handleInputChange} />
        <input className={styles.input} type = "text" placeholder="Enter a description..." name = "description" value={description} onChange={handleInputChange} />
        <input className={styles.input} type = "text" placeholder="Enter a learn level..." name = "level" value={level} onChange={handleInputChange} />
        <button className={styles.button} type = "submit">Save</button>
    </form>)
}