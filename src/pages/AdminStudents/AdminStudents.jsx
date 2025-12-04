import {useGetStudentsQuery} from "../../redux/admin/AdminList.js";
import {useState} from "react";
import { CiSearch } from "react-icons/ci";
import styles from "./adminStudents.module.css"
import {Modal} from "../../components/Modal/Modal.jsx";
import {AssignTeacher} from "../../components/AssignTeacher/AssignTeacher.jsx";

export const AdminStudents = () => {
    const {data:students} = useGetStudentsQuery();
    const [keyWord, setKeyWord] = useState("");
    const [isOpenModal, setIsOpenModal] = useState(false);
    const toggleModal = () => {
        setIsOpenModal(!isOpenModal);
    }
    const handleInputChange = (e) => {
        setKeyWord(e.target.value);
    }
    const studentsArray = students?.students?.filter((student)=>student.username.toLowerCase().includes(keyWord.toLowerCase())) || [];
    return (
        <section className={styles.studentsPage}>
            {/* Header section */}
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.title}>Students</h1>
                    <p className={styles.subtitle}>Manage all students in the system</p>
                </div>

                <button type="button" className={styles.addButton}>
                    + Add Student
                </button>
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
                        <li className={styles.listItem} key={student.userId}>
                            <div className={styles.studentInfo}>
                                <div className={styles.avatarWrapper}>
                                    {student.blobId ? (
                                        <img
                                            src={student.blobId}
                                            alt={student.username}
                                            className={styles.avatarImg}
                                        />
                                    ) : (
                                        <span className={styles.avatarFallback}>
                      {student.username?.[0] || "?"}
                    </span>
                                    )}
                                </div>

                                <div>
                                    <p className={styles.studentName}>{student.username}</p>
                                    <p className={styles.studentEmail}>{student.email}</p>
                                </div>
                            </div>

                            <div className={styles.actions}>
                                <button className={styles.assignButton} onClick={toggleModal}>Assign Teacher</button>
                            </div>
                            {isOpenModal && <Modal toggleModal={toggleModal} >
                                <AssignTeacher studentId = {student.userId} />
                            </Modal>}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};