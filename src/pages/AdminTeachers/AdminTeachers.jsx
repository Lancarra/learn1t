import {useState} from "react";
import {CiSearch} from "react-icons/ci";
import {useGetTeachersQuery} from "../../redux/admin/AdminList.js";
import {useGetByTeacherIdModulesQuery} from "../../redux/modules/moduleOperations.js";
import {NavLink} from "react-router-dom";
import styles from "./adminTeachers.module.css"
import {PiChalkboardTeacher} from "react-icons/pi";

export const AdminTeachers = () => {
    const {data:teachers} = useGetTeachersQuery();
    const {data:modules} = useGetByTeacherIdModulesQuery();
    const [keyWord, setKeyWord] = useState("");
    const handleInputChange = (e) => {
        setKeyWord(e.target.value);
    }
    const teachersArray = teachers?.teachers?.filter((teacher) =>
        teacher.username.toLowerCase().includes(keyWord.toLowerCase())
    ) || [];

    console.log(teachersArray);
    return (
        <section className={styles.teachersPage}>
            <div className={styles.container}>
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.title}>Teachers</h1>
                    <p className={styles.subtitle}>Manage all teachers in the system</p>
                </div>
            </div>

            <div className={`${styles.card} ${styles.teachersCard}`}>
                <div className={styles.cardHeader}>
                    <div>
                        <h2 className={styles.cardTitle}>
                            All Teachers ({teachers?.count || 0})
                        </h2>
                        <p className={styles.cardSubtitle}>
                            View and manage teacher information
                        </p>
                    </div>

                    <div className={styles.searchWrapper}>
                        <CiSearch className={styles.searchIcon} />
                        <input
                            type="text"
                            value={keyWord}
                            onChange={handleInputChange}
                            placeholder="Search teachers..."
                            className={styles.searchInput}
                        />
                    </div>
                </div>

                <ul className={styles.list}>
                    {teachersArray.map((teacher) => (
                        <li className={styles.listItem} key={teacher.userId}>
                            <div className={styles.teacherInfo}>
                                <div className={styles.avatarWrapper}>
                                    {teacher.blobId ? (
                                        <img
                                            src={`http://127.0.0.1:10000/devstoreaccount1/user-images/${teacher.blobId}`}
                                            alt={teacher.username}
                                            className={styles.avatarImg}
                                        />
                                    ) : (
                                        <span className={styles.avatarFallback}>
                                            <PiChalkboardTeacher />
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <p className={styles.teacherName}>{teacher.username}</p>
                                    <p className={styles.teacherEmail}>{teacher.email}</p>
                                    <p>{modules?.count}</p>
                                </div>
                            </div>

                            <div className={styles.actions}>
                                <NavLink
                                    to={`/admin/teacher/${teacher.userId}`}
                                    className={styles.detailsButton}
                                >
                                    View Details
                                </NavLink>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            </div>
        </section>
    );
};