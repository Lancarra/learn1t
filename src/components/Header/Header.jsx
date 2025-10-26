import { Link } from "react-router-dom";
import { Navigation } from "../Navigation/Navigation.jsx";
import styles from "./header.module.css"
import {useAuth} from "../../hooks/useAuth.js";

export const Header = () => {
    const {loggedIn} = useAuth();
    const handleLogout = () => {
        localStorage.removeItem("persist:auth");
        window.location.reload();
    }
    return (
    <div className={styles.headerWrap}>
        <div className={styles.topbarContainer}>
            <header className={styles.topbar}>
                <div className={styles.topbarLeft}>
                    <Link to="/" className={styles.brand}>LearnIT</Link>
                </div>
                {!loggedIn && <div className={styles.topbarRight}>
                    <Link to="/login" className={styles.btnLogin}>Log in</Link>
                </div>}
                {loggedIn && <div><Link to="/profile">Profile</Link></div>}
                {loggedIn && <button type="button" onClick={handleLogout}>Log Out</button>}
            </header>
        </div>

        <div className={styles.navContainer}>
            <Navigation />
        </div>
    </div>
)};
