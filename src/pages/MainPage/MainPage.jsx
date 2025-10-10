import {useNavigate} from 'react-router-dom';
import "../../styles/vars.css";
import styles from "./mainPage.module.css";

export const MainPage = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/register');
    }
    return (<>
        <div className={styles.wrapper}>
            <h1 className={styles.title}>
                Hello! Let's start learning together?
            </h1>
            <p className={styles.subtext}>
                Let us tailor your experience — choose the role that fits you
            </p>
            <button type="button" className={styles.button} onClick={handleClick}> Don't have account? Register now!</button>
        </div>
    </>)
}