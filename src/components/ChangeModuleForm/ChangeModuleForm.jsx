import {useState} from "react";
import {useUpdateModuleMutation} from "../../redux/modules/moduleOperations.js";
import styles from "./changeModuleForm.module.css";
import {useAuth} from "../../hooks/useAuth.js";

export const ChangeModuleForm = ({togglemodal, id, name}) => {
    const [module, setModule] = useState(name);
    const [updateModule] = useUpdateModuleMutation();
    const {user} = useAuth();
    const handleInputChange = (evt) => {
        setModule(evt.target.value);
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await updateModule({
            id: id,
            name: module,
            userId: +user.userId,
        })
        setModule("");
        togglemodal();
    }
    return (<form className={styles.form} onSubmit={handleSubmit}>
        <h3>Change Module</h3>
        <input className={styles.input} type = "text" placeholder="Edit a module name..." value={module} onChange={handleInputChange} />
        <button className={styles.button} type = "submit">Save</button>
    </form>)
}