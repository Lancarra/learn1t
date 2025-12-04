import {useAddQuizMutation} from "../../redux/quiz/quizOperations.js";
import {NavLink, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.js";


export const CreateTestForm = ({togglemodal,  dictionaryId}) => {
    const {user:{roleName}} = useAuth();
    const [addQuizModal] = useAddQuizMutation();
    const navigate = useNavigate();

    const handleAddQuiz = async() => {
        const data = await addQuizModal({ dictionaryId, questionsCount:6, name:"test1"})
        navigate(`/quiz/${data?.data.cardId}`);
        togglemodal()
    }
    const handleAddTest = async() => {
        const data = await addQuizModal({ dictionaryId, questionsCount:6, name:"test1"})
        navigate(`/test/info/${data?.data.cardId}`);
        togglemodal()
    }
    return <>
        <h1>What type of test do you want to choose?</h1>
        <button type="button" onClick={handleAddQuiz}>Word/Definition</button>
        <button type="button" onClick={togglemodal}>Definition/Word</button>
        {roleName === "Teacher" && <button type = "button" onClick={handleAddTest} >Create Test</button>}
        {roleName === "Teacher;" && <button type = "button" onClick={handleAddTest}>Create Test</button>}
        {roleName === "Admin" && <button type = "button" onClick={handleAddTest}>Create Test</button>}
        {roleName === "Admin;" && <button type = "button" onClick={handleAddTest}>Create Test</button>}
    </>
}