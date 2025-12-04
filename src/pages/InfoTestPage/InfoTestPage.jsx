import {useParams} from 'react-router-dom';
import localStorage from "redux-persist/es/storage";
import {useGetInfoQuizQuery} from "../../redux/quiz/quizOperations.js";
import {InfoDefinition} from "../../components/InfoDefinition/InfoDefinition.jsx";

export const InfoTestPage = () => {
    const {cardId} = useParams();
    localStorage.setItem("cardId", cardId);
    const {data} = useGetInfoQuizQuery(cardId);


    console.log("data: ", data);
    return (<>
            <ul>

                {data?.testUnits.map(({additionalAnswers, definition:{blobId, imageURL, meaning, word}}, i) =>
                <InfoDefinition key={i} imageURL={imageURL} meaning={meaning} word={word} blobId={blobId} additionalAnswers={additionalAnswers} />)}

            </ul>
        </>
    )
}