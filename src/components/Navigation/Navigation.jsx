import {Link} from "react-router-dom";
import "../../styles/vars.css";
import styles from "./navigation.module.css";

export const Navigation = () => {
    return (<nav>
        <ul className={styles.ulList}>
            <li><Link to="/">Home /</Link></li>
               {/* <li><Link to="/dashboard">Dashboard /</Link></li>
                <li><Link to="/profile">Profile /</Link></li>*/}
        </ul>
    </nav>)
}