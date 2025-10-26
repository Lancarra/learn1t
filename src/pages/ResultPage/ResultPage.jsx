import {useEffect, useState} from "react";
import {useAnswerQuizMutation} from "../../redux/quiz/quizOperations.js";
import {useParams} from "react-router-dom";
import {Statistics} from "../../components/Statistics/Statistics.jsx";

export const ResultPage = () => {
    const [showResultAnswer] = useAnswerQuizMutation();
    const {cardId} = useParams();
    const [result, setResult] = useState(null);

    useEffect(()=>{
        const answers = JSON.parse(localStorage.getItem("answer")) ?? []
        const show = async ()=>{
            const result = await showResultAnswer(
                {
                    testCardId: cardId,
                    testUnitAnswers: answers
                }
            )
            setResult(result.data.result)
        }
        show()
    },[])
    return <>
        <Statistics result={result}/>
    </>
}