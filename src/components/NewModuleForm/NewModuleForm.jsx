import {useState} from "react";
import {useAddModuleMutation} from "../../redux/modules/moduleOperations.js";
import {useAuth} from "../../hooks/useAuth.js"
import styles from "./newModuleForm.module.css";

export const NewModuleForm = ({togglemodal}) => {
    const [module, setModule] = useState("");
    const [addModule] = useAddModuleMutation();
    const {user} = useAuth();
    const handleInputChange = (evt) => {
        setModule(evt.target.value);
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await addModule({
            name: module,
            userId: user.userId,
        })
        setModule("");
        togglemodal();
    }
    return (<form className={styles.form} onSubmit={handleSubmit}>
        <p>Create new module</p>
        <input className={styles.input} type = "text" placeholder="Enter a module name..." value={module} onChange={handleInputChange} />
        <button className={styles.button} type = "submit">Save</button>
    </form>)
}