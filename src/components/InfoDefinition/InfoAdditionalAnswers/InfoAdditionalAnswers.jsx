import {useState} from 'react'
import styles from "./infoAdditionalAnswer.module.css";

export const InfoAdditionalAnswers = ({answer, handleUpdateTest}) => {
    const [variant, setVariant] = useState(answer)
    const handleInputChange = (e) => {
        setVariant(e.target.value)
        handleUpdateTest(answer, e.target.value);

    }
    return (
        <div className={styles.answerWrapper}>
            <input className={styles.answerInput} type="text" onChange={handleInputChange} value={variant}/>
        </div>
    );
};