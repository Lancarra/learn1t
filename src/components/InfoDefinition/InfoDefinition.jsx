import {InfoAdditionalAnswers} from "./InfoAdditionalAnswers/InfoAdditionalAnswers.jsx";
import {useUpdateQuizMutation} from "../../redux/quiz/quizOperations.js";
import {useState} from "react";
import {useParams} from "react-router-dom";
import styles from "./infoDefinition.module.css"

export const InfoDefinition = ({imageURL, blobId, meaning, word, additionalAnswers, name, definitionsCount, dictionaryId, id, testUnitId, testCardId
                               }) => {
    const {cardId} = useParams();
    const [updateTest]  = useUpdateQuizMutation();
    const [newAnswers, setNewAnswers] = useState(additionalAnswers);
    const handleUpdateTest = (value, newValue) => {
        const idx = additionalAnswers.findIndex((answer) => answer === value);

        const updated = [...additionalAnswers];
        updated[idx] = newValue;

        setNewAnswers(updated);
    };
    const handleSubmitUpdatedTest = () => {
        updateTest({
            cardId, definitionsCount, name,
            testUnits: [
                {
                    id:testUnitId,
                    additionalAnswers: [
                        ...newAnswers,
                    ],
                    definition: {
                        id,
                        word,
                        meaning,
                        blobId,
                        imageURL,
                        dictionaryId
                    },
                    testCardId
                }
            ],

        });
    }
    return (
            <li className={styles.container}>
                {(imageURL || blobId) && (
                    <div className={styles.imageContainer}>
                        {imageURL && <img className={styles.image} src={imageURL} alt="" />}
                        {blobId && <img className={styles.image} src={blobId} alt="" />}
                    </div>
                )}
                <div className={styles.wordItem}>
                    <span className={styles.wordLabel}>Word</span>
                    <span className={styles.wordValue}>{word}</span>
                </div>
                <div className={styles.wordItem}>
                    <span className={styles.wordLabel}>Meaning</span>
                    <span className={styles.wordValue}>{meaning}</span>
                </div>
                <div className={styles.editableContainer}>
                    <span className={styles.editableTitle}>Additional answers</span>
                    <ul className={styles.answersList}>
                        {additionalAnswers.map((answer, i) => (
                            <li key={i} className={styles.answerItem}>
                                <InfoAdditionalAnswers
                                    answer={answer}
                                    handleUpdateTest={handleUpdateTest}
                                />
                            </li>
                        ))}
                    </ul>
                    <button className={styles.updateButton} type="button" onClick={handleSubmitUpdatedTest}>Update definition</button>
                </div>
            </li>
        );
};