/*
import {useAddQuizMutation} from "../../redux/quiz/quizOperations.js";
*/
import {useNavigate} from "react-router-dom";
import styles from "./finishQuiz.module.css"

export const FinishQuiz = ({togglemodal, thirdbutton, variant}) => {
/*    const dictionaryId = JSON.parse(localStorage.getItem("id"))
    const [addQuizModal] = useAddQuizMutation();*/
    const navigate = useNavigate();

    const handleAddQuiz = async() => {
        const cardId = localStorage.getItem("cardId");
        localStorage.setItem("answer", JSON.stringify([]));
        navigate(`/quiz/${cardId}`);
        togglemodal()
    }

    const handleShowResult = async () => {
        const cardId = localStorage.getItem("cardId");
        navigate(`/quiz/result/${cardId}`)
    }
    const handleSecondAddQuiz = async() => {
        const cardId = localStorage.getItem("cardId");
        localStorage.setItem("answer", JSON.stringify([]));
        navigate(`/secondquiz/${cardId}`);
        togglemodal()
    }


    return (
        <div className={styles.modal}>
            {!variant && <h1 className={styles.title}>Congratulations 🎉</h1>}
            {variant && <h1 className={styles.title}>Well Done 🎉</h1>}

            {!variant && <p className={styles.subtitle}>
                You’ve finished the first part of the quiz
            </p>}
            {variant && <p className={styles.subtitle}>
                You’ve finished the second part of the quiz
            </p>}

            {!variant && <div className={styles.mainAction}>
                <button type="button" className={styles.primaryButton} onClick={handleSecondAddQuiz}>
                    Continue learning — writing practice
                </button>
            </div>}

            <div className={styles.secondaryActions}>
                <button  type = "button" className={styles.secondaryButton} onClick={handleAddQuiz}>
                    Repeat the quiz
                </button>

                <button type = "button" className={styles.ghostButton} onClick={handleShowResult}>
                    {thirdbutton}
                </button>
            </div>
        </div>
    );
};


