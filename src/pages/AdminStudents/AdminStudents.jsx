import {useGetStudentsQuery} from "../../redux/admin/AdminList.js";
import {useState} from "react";
import { CiSearch } from "react-icons/ci";
import { PiStudent } from "react-icons/pi";
import styles from "./adminStudents.module.css"
import {Modal} from "../../components/Modal/Modal.jsx";
import {AssignTeacher} from "../../components/AssignTeacher/AssignTeacher.jsx";
import AdminStudentItem from "../../components/AdminStudentItem/AdminStudentItem.jsx";

export const AdminStudents = () => {
    const {data:students} = useGetStudentsQuery();
    const [keyWord, setKeyWord] = useState("");

    const handleInputChange = (e) => {
        setKeyWord(e.target.value);
    }
    const studentsArray = students?.students?.filter((student)=>student.username.toLowerCase().includes(keyWord.toLowerCase())) || [];
    console.log(studentsArray)
    return (
        <section className={styles.studentsPage}>
            <div className={styles.container}>
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.title}>Students</h1>
                    <p className={styles.subtitle}>Manage all students in the system</p>
                </div>


            </div>

            {/* Main card */}
            <div className={`${styles.card} ${styles.studentsCard}`}>
                <div className={styles.cardHeader}>
                    <div>
                        <h2 className={styles.cardTitle}>
                            All Students ({students?.count || 0})
                        </h2>
                        <p className={styles.cardSubtitle}>
                            View and manage student information
                        </p>
                    </div>

                    {/* Search */}
                    <div className={styles.searchWrapper}>
                        <CiSearch className={styles.searchIcon} />
                        <input
                            type="text"
                            value={keyWord}
                            onChange={handleInputChange}
                            placeholder="Search students..."
                            className={styles.searchInput}
                        />
                    </div>
                </div>

                <ul className={styles.list}>
                    {studentsArray.map((student) => (
                       <AdminStudentItem key={student.userId} student={student} />
                    ))}
                </ul>
            </div>
            </div>
        </section>
    );
};