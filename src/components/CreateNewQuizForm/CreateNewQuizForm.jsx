import {useAddQuizMutation} from "../../redux/quiz/quizOperations.js";
import {useNavigate} from "react-router-dom";


export const CreateNewQuizForm = ({togglemodal,  dictionaryId}) => {
    const [addQuizModal] = useAddQuizMutation();
    const navigate = useNavigate();

    const handleAddQuiz = async() => {
        const data = await addQuizModal({ dictionaryId, questionsCount:6, name:"test1"})
        navigate(`/quiz/${data?.data.cardId}`);
        togglemodal()
    }

    return <>
    <h1>Do you want to study this dictionary?</h1>
        <button type="button" onClick={handleAddQuiz}>Yes</button>
        <button type="button" onClick={togglemodal}>Not now</button>
    </>
}