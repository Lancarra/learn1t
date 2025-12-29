import {SayButton} from "react-say";
import {AiOutlineSound} from "react-icons/ai";

function Speak ({textToSpeak}) {
    return<SayButton speak = {textToSpeak}>
        <AiOutlineSound /></SayButton>
}
export default Speak;