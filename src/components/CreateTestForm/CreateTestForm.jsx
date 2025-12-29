import {useAddQuizMutation} from "../../redux/quiz/quizOperations.js";
import {NavLink, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.js";
import {useState} from "react";
import styles from "./сreateTestForm.module.css";

const options = [1,5,10,15,20,25,30,35,40,45,50]

export const CreateTestForm = ({togglemodal,  dictionaryId}) => {
    const {user:{roleName}} = useAuth();
    const [addQuizModal] = useAddQuizMutation();
    const navigate = useNavigate();
    const [value, setValue] = useState(10);
    const [name, setName] = useState("");

    const handleAddQuiz = async() => {
        const data = await addQuizModal({ dictionaryId, questionsCount:value, name})
        navigate(`/quiz/${data?.data.cardId}`);
        togglemodal()
    }
    const handleAddTest = async() => {
        const data = await addQuizModal({ dictionaryId, questionsCount:value, name})
        navigate(`/test/info/${data?.data.cardId}`);
        togglemodal()
    }
    const handleOptionChange = (e) => {
        setValue(e.target.value)
    }
    const handleInputChange = (e) => {
        setName(e.target.value)
    }
    return <>
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Create Test</h1>
            <div className={styles.field}>
                <label className={styles.label}>Test name</label>
                <input type="text" className={styles.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter test name"/>
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Number of words</label>
                <select className={styles.select} value={value} onChange={(e) => setValue(e.target.value)}>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        {/*<button type="button" onClick={handleAddQuiz}>Word/Definition</button>
        <button type="button" onClick={togglemodal}>Definition/Word</button>*/}
            <div className={styles.actions}>
                {roleName === "Teacher" && <button type = "button" onClick={handleAddTest}  className={styles.primaryBtn}>Create Test</button>}
                {roleName === "Teacher;" && <button type = "button" onClick={handleAddTest}  className={styles.primaryBtn}>Create Test</button>}
                {roleName === "Admin" && <button type = "button" onClick={handleAddTest}  className={styles.primaryBtn}>Create Test</button>}
                {roleName === "Admin;" && <button type = "button" onClick={handleAddTest}  className={styles.primaryBtn}>Create Test</button>}

                <button type="button" onClick={togglemodal} className={styles.secondaryBtn}>Cancel</button>
            </div>
        </div>
    </>
}