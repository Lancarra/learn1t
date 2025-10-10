import {useState} from "react";

export const VariantItem = ({value, meaning, index, setIndex, dataLength}) => {
    const [answer, setAnswer] = useState("black");
    const handleAnswer = (evt) => {
        const {textContent} = evt.target;
        if (textContent === meaning) {
            setAnswer("green");
        }else{
            setAnswer("red");
        }
        setTimeout(()=>{
            setIndex(index === dataLength?0:index+1);
            setAnswer("black");
        },1500)
    }
    return <>
        <li onClick={handleAnswer}>
            <p style = {{color:answer}}>{value}</p>
        </li>
    </>
}