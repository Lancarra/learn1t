import {AiOutlineSound} from "react-icons/ai";
import {useSpeech} from "react-text-to-speech";

function SpeakSecond ({textToSpeak}) {
    const {start} = useSpeech({text: textToSpeak});
    return<button onClick={start}><AiOutlineSound /></button>
}
export default SpeakSecond;