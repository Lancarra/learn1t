import { Link } from "react-router-dom";
import { Navigation } from "../Navigation/Navigation.jsx";
import styles from "./header.module.css"

export const Header = () => (
    <div className={styles.headerWrap}>
        <div className={styles.topbarContainer}>
            <header className={styles.topbar}>
                <div className={styles.topbarLeft}>
                    <Link to="/" className={styles.brand}>LearnIT</Link>
                </div>
                <div className={styles.topbarRight}>
                    <Link to="/login" className={styles.btnLogin}>Log in</Link>
                </div>
            </header>
        </div>

        <div className={styles.navContainer}>
            <Navigation />
        </div>
    </div>
);
