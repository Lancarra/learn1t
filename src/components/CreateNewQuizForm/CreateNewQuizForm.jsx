import {useAddQuizMutation} from "../../redux/quiz/quizOperations.js";
import {useNavigate} from "react-router-dom";
import styles from "./сreateNewQuizForm.module.css";


export const CreateNewQuizForm = ({togglemodal,  dictionaryId}) => {
    const [addQuizModal] = useAddQuizMutation();
    const navigate = useNavigate();

    const handleAddQuiz = async() => {
        const data = await addQuizModal({ dictionaryId, questionsCount:6, name:"test1"})
        navigate(`/quiz/${data?.data.cardId}`);
        togglemodal()
    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>
                Do you want to study this dictionary?
            </h1>

            <div className={styles.buttons}>
                <button type="button" onClick={handleAddQuiz} className={styles.primaryBtn}>Yes</button>
                <button type="button" onClick={togglemodal} className={styles.secondaryBtn}>Not now</button>
            </div>
        </div>
    );
};