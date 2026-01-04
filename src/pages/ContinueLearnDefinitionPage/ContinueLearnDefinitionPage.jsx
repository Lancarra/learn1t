import styles from "./continueLearnDefinitionpage.module.css";
import {useParams} from "react-router-dom";
import localStorage from "redux-persist/es/storage";
import {useCheckAnswerMutation, useGetQuizQuery} from "../../redux/quiz/quizOperations.js";
import {useState} from "react";
import {useGetDefinitionByIdQuery} from "../../redux/definitionList/definitionaList.js";
import {Modal} from "../../components/Modal/Modal.jsx";
import {FinishQuiz} from "../../components/FinishQuiz/FinishQuiz.jsx";
const answers = []

export const ContinueLearnDefinitionPage = () => {
    const {cardId} = useParams();
    localStorage.setItem("cardId", cardId);
    const {data} = useGetQuizQuery(cardId);
    const [index, setIndex] = useState(0);
    const [checkAnswer] = useCheckAnswerMutation();
    const [isShowModal, setIsShowModal] = useState(false);
    const [myAnswer, setMyAnswer] = useState("");
    const [help, setHelp] = useState(false);

    const randomCard = data?.testUnits[index];
    const {data:definition} = useGetDefinitionByIdQuery(randomCard?.definitionId);

    const [maxProgress, setMaxProgress] = useState(0);

    const toggleModal = () => {
        setIsShowModal(!isShowModal);
    }
    const handleAnswer = async (event) =>{
        event.preventDefault();
        setHelp(false);
        if(myAnswer !== definition?.meaning){
            setHelp(true);
            await checkAnswer({ definitionId: randomCard?.definitionId, userAnswer: myAnswer });
            answers.push({ testUnitId: randomCard?.testUnitId, answer: myAnswer, img: definition.imageURL, word: definition.word, meaning: definition.meaning });
            localStorage.setItem("answer", JSON.stringify(answers));
            return;
        }
        const  lsanswer = await localStorage.getItem("answer");
        const lsdata = await JSON.parse(lsanswer);
        const duplicate = lsdata.find((item) => item?.word === definition?.word);
        if (duplicate) {
            setMaxProgress(prev => {
                if(prev === data?.testUnits.length){
                    return prev;
                }
                if (prev === data?.testUnits.length -1 ){
                    toggleModal()
                }
                return prev + 1;
            })
            if (answers.length === data?.testUnits.length) {
                answers.length = 0
                setMaxProgress(0)
            }
            setIndex(index === data?.testUnits.length - 1 ? 0 : index + 1);
            setMyAnswer("");
            return
        }
        await checkAnswer({ definitionId: randomCard?.definitionId, userAnswer: myAnswer });
        setMaxProgress(prev => {
            if(prev === data?.testUnits.length){
                return prev;
            }
            if (prev === data?.testUnits.length -1 ){
                toggleModal()
            }
            return prev + 1;
        })
        answers.push({ testUnitId: randomCard?.testUnitId, answer: myAnswer, img: definition.imageURL, word: definition.word, meaning: definition.meaning });
        localStorage.setItem("answer", JSON.stringify(answers));
        if (answers.length === data?.testUnits.length) {
            answers.length = 0
            setMaxProgress(0)
        }
        setIndex(index === data?.testUnits.length - 1 ? 0 : index + 1);
        setMyAnswer("");
    }

    const handleInputChange = (event) => {
        const value = event.target.value[0].toUpperCase() + event.target.value.slice(1);
        setMyAnswer(value.trim());
    }
    return<>
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
                <div className={styles.answerWrapper}>
                    <form className={styles.answerForm} onSubmit={handleAnswer}>
                        <input className={styles.answerInput} type="text" placeholder="Type the meaning" onChange={handleInputChange} value={myAnswer}
                            autoFocus/>
                        <button className={styles.nextButton} type="submit">
                            Next
                        </button>
                    </form>
                    {help && (
                        <p className={styles.hint}>
                            Correct answer: <strong>{definition?.meaning}</strong>
                        </p>
                    )}
                </div>
            </div>
        </div>
        {isShowModal && <Modal toggleModal={toggleModal} size="sm"><FinishQuiz togglemodal={toggleModal} thirdbutton = "Show result" dictionaryId={cardId} variant = {true} /></Modal>}
    </>
}