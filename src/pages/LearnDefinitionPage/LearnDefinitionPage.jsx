import {useParams} from "react-router-dom";
import {useGetQuizQuery} from "../../redux/quiz/quizOperations.js";
import {useGetDefinitionByIdQuery} from "../../redux/definitionList/definitionaList.js";
import {useEffect, useState} from "react";
import {VariantItem} from "./components/VariantItem/VariantItem.jsx";


export const LearnDefinitionPage = () => {
    const {cardId} = useParams();
    const {data} = useGetQuizQuery(cardId);
    const [index, setIndex] = useState(0);

/*
        const randomIndex = Math.floor(Math.random() * data?.testUnits.length);
*/
    const randomCard = data?.testUnits[index];
    const {data:definition} = useGetDefinitionByIdQuery(randomCard?.definitionId);

        return <>
            <div>
                <img src ={definition?.imageURL}/>
                <p>{definition?.word}</p>
            </div>
            <ul>
                {randomCard?.additionalAnswers.map((value, id)=><VariantItem key = {id} value={value} meaning={definition?.meaning} index = {index}
                setIndex={setIndex} dataLength={data?.testUnits.length-1}/>)}
            </ul>
        </>
}