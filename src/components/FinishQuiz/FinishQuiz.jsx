import {useAddQuizMutation} from "../../redux/quiz/quizOperations.js";
import {useNavigate} from "react-router-dom";


export const FinishQuiz = ({togglemodal, thirdbutton}) => {
    const dictionaryId = JSON.parse(localStorage.getItem("id"))
    const [addQuizModal] = useAddQuizMutation();
    const navigate = useNavigate();

    const handleAddQuiz = async() => {
/*
        const data = await addQuizModal({testUnits:[{dictionaryId}]})
*/
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


    return (<>
            <h1>Congratulation!!!</h1>
            <button type = "button" onClick={handleAddQuiz}>Repeat the quiz again</button>
            <button type = "button" onClick={handleSecondAddQuiz}>Continue learn quiz</button>
            <button type = "button" onClick={handleShowResult}>{thirdbutton}</button>
        </>
    )
}

