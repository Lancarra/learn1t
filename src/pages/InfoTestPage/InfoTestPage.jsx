import {useParams} from 'react-router-dom';
import localStorage from "redux-persist/es/storage";
import {useGetInfoQuizQuery} from "../../redux/quiz/quizOperations.js";
import {InfoDefinition} from "../../components/InfoDefinition/InfoDefinition.jsx";
import styles from "./infoTestPage.module.css"

export const InfoTestPage = () => {
    const {cardId} = useParams();
    localStorage.setItem("cardId", cardId);
    const {data} = useGetInfoQuizQuery(cardId);

    return (
        <div className={styles.page}>
            <div className={styles.inner}>
                <header className={styles.header}>
                    <h2 className={styles.title}>{data?.name}</h2>
                    <p className={styles.meta}>
                        Total words: <strong>{data?.definitionsCount ?? 0}</strong>
                    </p>
                </header>

                <ul className={styles.list}>
                    {data?.testUnits?.map(
                        (
                            {
                                additionalAnswers,
                                testUnitId,
                                testCardId,
                                dictionaryId,
                                id,
                                definition: { blobId, imageURL, meaning, word },
                            },
                            i
                        ) => (
                            <li className={styles.listItem} key={id ?? i}>
                                <InfoDefinition
                                    imageURL={imageURL}
                                    meaning={meaning}
                                    word={word}
                                    blobId={blobId}
                                    additionalAnswers={additionalAnswers}
                                    name={data?.name}
                                    definitionsCount={data?.definitionsCount}
                                    testUnitId={testUnitId}
                                    dictionaryId={dictionaryId}
                                    id={id}
                                    testCardId={testCardId}
                                />
                            </li>
                        )
                    )}
                </ul>
            </div>
        </div>
    );
};