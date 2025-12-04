import {InfoAdditionalAnswers} from "./InfoAdditionalAnswers/InfoAdditionalAnswers.jsx";
import {useUpdateQuizMutation} from "../../redux/quiz/quizOperations.js";

export const InfoDefinition = ({imageURL, blobId, meaning, word, additionalAnswers}) => {
    const [updateTest]  = useUpdateQuizMutation();

    const handleUpdateTest = (value, newValue) => {
        const idx = additionalAnswers.findIndex((answer)=> answer === value)
        additionalAnswers.splice(idx, 1, newValue);
    }

    const handleSubmitUpdatedTest = () => {
        updateTest();
    }
    return (<>
            <li>
            {imageURL && <img src={imageURL} alt=""/>}
            {blobId && <img src={blobId} alt=""/>}
            <p>{word}</p>
            <p>{meaning}</p>
            <ul>
                {additionalAnswers.map((answer, i) =>
                <InfoAdditionalAnswers key={i} answer={answer} />)}
            </ul>
            <button type="button" onClick = {handleSubmitUpdatedTest}>Update Test</button>

        </li>
    </>
    )
}