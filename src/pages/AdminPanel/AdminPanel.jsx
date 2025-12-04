import { PiStudentLight } from "react-icons/pi";
import { PiChalkboardTeacherLight } from "react-icons/pi";
import { IoBookOutline } from "react-icons/io5";
import { PiChartLineUpLight } from "react-icons/pi";
import styles from "./adminPanel.module.css"
import {useGetStudentsQuery, useGetTeachersQuery} from "../../redux/admin/AdminList.js";
import {useGetModulesQuery} from "../../redux/modules/moduleOperations.js";
import {NavLink} from "react-router-dom";

const adminManagement = [{
    id: 1,
    title: "Student Management",
    text: "View and manage all students in the system",
    src: "/admin/students",
    icon: <PiStudentLight size={20} />,
    btnText: "Manage Students",
},
    {
        id: 2,
        title: "Teacher Management",
        text: "View and manage all teacher in the system",
        src: "/admin/teachers",
        icon: <PiChalkboardTeacherLight size={20} />,
        btnText: "Manage Teachers",
    }]

export const AdminPanel = () => {
    const {data:teachers} = useGetTeachersQuery();
    const {data:students} = useGetStudentsQuery();
    const {data:modules} = useGetModulesQuery();
console.log(modules);
    return (
        <div className={styles.adminPanel}>
            <div className={styles.header}>
                <h1 className={styles.title}>Admin Dashboard</h1>
                <p className={styles.subtitle}>Manage your word learning platform</p>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.statsGrid}>
                    <div className={`${styles.card} ${styles.statCard}`}>
                        <div className={styles.statHeader}>
                            <h3 className={styles.statTitle}>Total Students</h3>
                            <PiStudentLight className={styles.statIcon} />
                        </div>
                        <div className={styles.statContent}>
                            <p className={styles.statNumber}>{students?.count || 0}</p>
                        </div>
                    </div>

                    <div className={`${styles.card} ${styles.statCard}`}>
                        <div className={styles.statHeader}>
                            <h3 className={styles.statTitle}>Total Teachers</h3>
                            <PiChalkboardTeacherLight className={styles.statIcon} />
                        </div>
                        <div className={styles.statContent}>
                            <p className={styles.statNumber}>{teachers?.count || 0}</p>
                        </div>
                    </div>

                    <div className={`${styles.card} ${styles.statCard}`}>
                        <div className={styles.statHeader}>
                            <h3 className={styles.statTitle}>Active Courses</h3>
                            <IoBookOutline className={styles.statIcon} />
                        </div>
                        <div  className={styles.statContent}>
                            <p className={styles.statNumber}>{modules?.count }</p>
                        </div>
                    </div>

                    <div className={`${styles.card} ${styles.statCard}`}>
                        <div className={styles.statHeader}>
                            <h3 className={styles.statTitle}>Total Quiz</h3>
                            <PiChartLineUpLight className={styles.statIcon} />
                        </div>
                        <div className={styles.statContent}>
                            <p className={styles.statNumber}>{modules?.quizCount}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.managementGrid}>
                    {adminManagement.map(({id, title, text, src, icon, btnText}) => (
                        <div key={id} className={`${styles.card} ${styles.managementCard}`}>
                            <div className={styles.managementHeader}>
                                <h3 className={styles.managementTitle}>{title}</h3>
                                <p className={styles.managementText}>{text}</p>
                            </div>
                            <div className={styles.managementFooter}>
                                <a href={src} className={styles.managementButton}>
                                    {icon}
                                    {btnText}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                <ul className={styles.modulesList}>
                    {modules?.modules?.map(({ id, author, name }) => (
                        <li key={id} className={styles.moduleItem}>
                            <NavLink to={`/dashboard/module/${id}`} className={styles.moduleCard}>
                                <p className={styles.moduleName}>{name}</p>
                                <p className={styles.moduleAuthor}>by {author}</p>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}