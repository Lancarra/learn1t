import {NavLink} from "react-router-dom";
import {PiChalkboardTeacher} from "react-icons/pi";
import styles from "../../pages/AdminTeachers/adminTeachers.module.css"
import {useGetByTeacherIdModulesQuery} from "../../redux/modules/moduleOperations.js";
import {toast} from "react-toastify";
import {useDeleteUserMutation} from "../../redux/admin/AdminList.js";

export const AdminTeacherItem = ({teacher}) => {
    const [deleteUser] = useDeleteUserMutation();
    const {data:modules} = useGetByTeacherIdModulesQuery(teacher.userId);
    const handleDelete = async () => {
        await deleteUser({
            userId: teacher.userId,
            email: teacher.email,
        })
        toast.success("Teacher successfully deleted.");
    }
    return  <li className={styles.listItem} key={teacher.userId}>
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
            </div>
        </div>

        <div className={styles.actions}>
            <NavLink
                to={`/admin/teacher/${teacher.userId}`}
                className={styles.detailsButton}>
                View Details
            </NavLink>
            <button className={styles.deleteButton} type="button" onClick={handleDelete}>Delete</button>
        </div>

    </li>
}