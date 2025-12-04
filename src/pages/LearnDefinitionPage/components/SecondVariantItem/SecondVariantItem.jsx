import {useState} from "react";
import s from "./variantItem.module.css";

export const SecondVariantItem = ({ value, meaning, index, setIndex, dataLength, onClick }) => {
    const [state, setState] = useState("idle");

    const handleAnswer = (e) => {
        const text = e.currentTarget.textContent.trim();
        const ok = text === (meaning || "").trim();
        setState(ok ? "correct" : "wrong");
        setTimeout(() => {
            setIndex(index === dataLength ? 0 : index + 1);
            setState("idle");
        }, 800);
        onClick(text);
    };

    const className =
        state === "correct" ? `${s.option} ${s.optionCorrect}` :
            state === "wrong"   ? `${s.option} ${s.optionWrong}`   :
                s.option;

    return (
        <li className={className} onClick={handleAnswer} role="button" tabIndex={0}>
            {value}
        </li>
    );
};
