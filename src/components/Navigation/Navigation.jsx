import { Link } from "react-router-dom";
import styles from "./navigation.module.css";
import {useLocation} from "react-router-dom";

export const Navigation = () => {
    const location = useLocation();
    console.log(location);
    return (
        <nav className={styles.crumbBar}>
            <ul className={styles.ulList}>
                <li className={styles.ulItem}>
{/*
                    <Link to="/" className={styles.ulLink}>Home</Link>
*/}
                </li>
            </ul>
        </nav>
    );
};
