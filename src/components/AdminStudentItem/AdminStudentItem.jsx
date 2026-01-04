import {PiStudent} from "react-icons/pi";
import {AssignTeacher} from "../AssignTeacher/AssignTeacher.jsx";
import {useState} from "react";
import styles from "../../pages/AdminStudents/adminStudents.module.css"
import {Modal} from "../Modal/Modal.jsx";

const AdminStudentItem = ({ student }) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const toggleModal = () => {
        setIsOpenModal(!isOpenModal);
    }
    return  <li className={styles.listItem} key={student.userId}>
        <div className={styles.studentInfo}>
            <div className={styles.avatarWrapper}>
                {student.blobId ? (
                    <img
                        src={`http://127.0.0.1:10000/devstoreaccount1/user-images/${student.blobId}`}
                        alt={student.username}
                        className={styles.avatarImg}
                    />
                ) : (
                    <span className={styles.avatarFallback}>
                                            <PiStudent />
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
}
export default AdminStudentItem