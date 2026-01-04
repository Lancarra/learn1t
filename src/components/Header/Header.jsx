import {Link, NavLink} from "react-router-dom";
import { Navigation } from "../Navigation/Navigation.jsx";
import styles from "./header.module.css";
import { useAuth } from "../../hooks/useAuth.js";

export const Header = () => {
    const { loggedIn, user } = useAuth();
    const handleLogout = () => {
        localStorage.removeItem("persist:auth");
        window.location.reload();
    };
    return (
        <div className={styles.headerWrap}>
            <div className={styles.topbarContainer}>
                <header className={styles.topbar}>
                    <div className={styles.topbarLeft}>
                        {user.roleName === "Admin" && <Link to="/admin/panel" className={styles.brand}>LearnIT</Link>}
                        {user.roleName === "Admin;" && <Link to="/admin/panel" className={styles.brand}>LearnIT</Link>}
                        {user.roleName === "Teacher" && <Link to={`/admin/teacher/${user.userId}`} className={styles.brand}>LearnIT</Link>}
                        {user.roleName === "Teacher;" && <Link to={`/admin/teacher/${user.userId}`} className={styles.brand}>LearnIT</Link>}
                        {user.roleName === "Student" && <Link to="/dashboard" className={styles.brand}>LearnIT</Link>}
                        {user.roleName === "Student;" && <Link to="/dashboard" className={styles.brand}>LearnIT</Link>}
                    </div>

                    <div className={styles.topbarRight}>
                        {!loggedIn && (
                            <Link to="/login" className={styles.btnLogin}>Log in</Link>
                        )}
                        {loggedIn && (
                            <>
                                <NavLink to="/profile" className={styles.profileBtn}>Profile</NavLink>
                                <button type="button" onClick={handleLogout} className={styles.logoutBtn}>
                                    Log Out
                                </button>
                            </>
                        )}
{/*                        {user.roleName === "Admin"  && <NavLink to = "/admin/panel">Admin Panel</NavLink>}
                        {user.roleName === "Admin;"  && <NavLink to = "/admin/panel">Admin Panel</NavLink>}*/}
                    </div>
                </header>
            </div>

            <div className={styles.crumbsBar}>
                <div className={styles.crumbsInner}>
                    <Navigation />
                </div>
            </div>
        </div>
    );
};
