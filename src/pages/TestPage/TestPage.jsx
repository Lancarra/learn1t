import {NavLink, useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useCheckAnswerMutation, useGetQuizQuery} from "../../redux/quiz/quizOperations.js";
import {useGetDefinitionByIdQuery} from "../../redux/definitionList/definitionaList.js";
import {useState} from "react";
import {VariantItem} from "../LearnDefinitionPage/components/VariantItem/VariantItem.jsx";
import styles from "./testPage.module.css";
import {Modal} from "../../components/Modal/Modal.jsx";
import {FinishQuiz} from "../../components/FinishQuiz/FinishQuiz.jsx";
import localStorage from "redux-persist/es/storage";
const answers = []


export const TestPage = () => {
    const navigate = useNavigate();
    const {cardId} = useParams();
/*
    localStorage.setItem("cardId", cardId);
*/
    const {data} = useGetQuizQuery(cardId);
    const [index, setIndex] = useState(0);
    const [checkAnswer] = useCheckAnswerMutation();
    const [isShowModal, setIsShowModal] = useState(false);

    const randomCard = data?.testUnits[index];
    const {data:definition} = useGetDefinitionByIdQuery(randomCard?.definitionId);

    const [maxProgress, setMaxProgress] = useState(0);

    const toggleModal = () => {
        setIsShowModal(!isShowModal);
    }
    const handleAnswer = async (value) =>{

        await checkAnswer({ definitionId: randomCard?.definitionId, userAnswer: value });
        setMaxProgress(prev => {
            if(prev === data?.testUnits.length){
                return prev;
            }
            if (prev === data?.testUnits.length -1 ){
/*
                const cardId = localStorage.getItem("cardId");
*/
                navigate(`/quiz/result/${cardId}`);
            }
            return prev + 1;
        })
        answers.push({ testUnitId: randomCard?.testUnitId, answer: value, img: definition.imageURL, word: definition.word, meaning: definition.meaning });
        localStorage.setItem("answer", JSON.stringify(answers));
        if (answers.length === data?.testUnits.length) {
            answers.length = 0
            setMaxProgress(0)
        }
    }
    return (
        <>
            <div className={styles.lp}>
                <div className={styles.inner}>
                    <h1 className={styles.title}>Learn Words</h1>
                    <div className={styles.rule}>
                        <div
                            className={styles.progress}
                            style={{ width: `${(maxProgress/data?.testUnits.length)*100 }%` }}
                        />
                    </div>
                    <section className={styles.card}>
                        <div className={styles.thumb}>
                            {definition?.imageURL && (
                                <img src={definition.imageURL} alt={definition?.word || "image"} />
                            )}
                        </div>
                        <div className={styles.word}>{definition?.word}</div>
                    </section>

                    <ul className={styles.grid}>
                        {randomCard?.additionalAnswers.map((value, id) => (
                            <VariantItem onClick={handleAnswer}
                                         key={id}
                                         value={value}
                                         meaning={definition?.meaning}
                                         index={index}
                                         setIndex={setIndex}
                                         dataLength={data?.testUnits.length - 1}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};