import {NavLink} from "react-router-dom";
import styles from "../../pages/TeacherPanel/teacherPanel.module.css";
import {ManageCourseModule} from "../ManageCourseModule/ManageCourseModule.jsx";
import {useState} from "react";
import {Modal} from "../Modal/Modal.jsx";

export const ModuleListItem = ({id,moduleName, moduleLevel, moduleDescription, studentCount, students}) => {
    const [isShowModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!isShowModal);
    }

    return (
        <li  className={`${styles.card} ${styles.moduleItem}`}>
            <NavLink to={`/dashboard/module/${id}`} className={styles.moduleLink}>
                <div className={styles.moduleHeader}>
                    <h3 className={styles.moduleTitle}>{moduleName}</h3>
                    <span className={styles.moduleLevelBadge}>
                                    {moduleLevel || "All Levels"}
                    </span>
                </div>

                <p className={styles.moduleDescription}>
                    {moduleDescription || "No description provided"}
                </p>
            </NavLink>

            <div className={styles.moduleFooter}>
                <div className={styles.moduleStat}>
                    <span className={styles.statNumber}>{studentCount || "0"}</span>
                    <span className={styles.statLabel}>students</span>
                </div>
                <button type="button" className={styles.addButton} onClick={toggleModal}>
                    Manage Module
                </button>
            </div>
        {isShowModal &&  (<Modal toggleModal={toggleModal} size="lg">
            <ManageCourseModule id={id} moduleName = {moduleName} moduleLevel = {moduleLevel} moduleDescription = {moduleDescription} studentCount = {studentCount} students={students} toggleModal = {toggleModal} />
        </Modal>
        )}
    </li>
    );
};