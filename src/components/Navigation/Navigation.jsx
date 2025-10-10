import authNav from '../../data/navigation.json';
import {Link} from "react-router-dom";
import "../../styles/vars.css";
import styles from "./navigation.module.css";

export const Navigation = () => {
    return (<nav>
        <ul className={styles.ulList}>
            <li><Link to="/">Home /</Link></li>
            {authNav.map(({id, src, text}) => (<li key={id}><Link to={src}>{text}</Link></li>))}
            <li><Link to="/dashboard">Dashboard /</Link></li>
        </ul>
    </nav>)
}