import {useEffect, useState} from "react";
import {useAnswerQuizMutation} from "../../redux/quiz/quizOperations.js";
import {useParams} from "react-router-dom";
import {Statistics} from "../../components/Statistics/Statistics.jsx";
import styles from "./resultPage.module.css";

export const ResultPage = () => {
    const [showResultAnswer] = useAnswerQuizMutation();
    const { cardId } = useParams();
    const [result, setResult] = useState(null);
    const [data, setData] = useState([]);
/*
    const [secondData, setSecondData] = useState([]);
*/

    useEffect(() => {
        const answers = JSON.parse(localStorage.getItem("answer")) ?? [];
        setData(answers);

        (async () => {
            const res = await showResultAnswer({
                testCardId: cardId,
                testUnitAnswers: answers,
            });
            setResult(res.data.result);
        })();
    }, [cardId, showResultAnswer]);

    return (
        <div className={styles["result-page"]}>
            <Statistics result={result} />
            <ul className={styles.answers}>
                {data.map((item, i) => {
                    const isCorrect =
                        item.isCorrect ??
                        (item.answer?.trim().toLowerCase() ===
                            item.meaning?.trim().toLowerCase());

                    return (
                        <li
                            key={i}
                            className={`${styles["answer-card"]} ${
                                isCorrect ? styles.correct : styles.incorrect
                            }`}
                        >
                            {item.img ? (
                                <img src={item.img} alt={item.word} />
                            ) : (
                                <div className={styles.thumbPlaceholder} />
                            )}

                            <div className={styles["answer-text"]}>
                                <p className={styles.word}>{item.word}</p>

                                <p className={styles.meaning}>
                                    <span className={styles.label}>Your answer: </span>
                                    <span className={isCorrect ? styles.good : styles.bad}>
                    {item.answer || "—"}
                  </span>
                                </p>

                                <p className={styles.meaning}>
                                    <span className={styles.label}>Correct: </span>
                                    <span>{item.meaning}</span>
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
