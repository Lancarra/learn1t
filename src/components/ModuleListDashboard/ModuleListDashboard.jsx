import styles from "../../pages/TeacherPanel/teacherPanel.module.css";
import {NavLink} from "react-router-dom";
import {ManageCourseModule} from "../ManageCourseModule/ManageCourseModule.jsx";
import {Modal} from "../Modal/Modal.jsx";
import {ModuleListItem} from "../ModuleListItem/ModuleListItem.jsx";

export const ModuleListDashboard = ({modulesArray}) => {
    return (<>
        <ul className={styles.modulesList}>
            {modulesArray.map((module) => (
                <ModuleListItem key = {module.id} id={module.id} moduleName = {module.name}
                                moduleLevel = {module.learnLevel} moduleDescription = {module.description}
                                studentCount = {module.students.length} students = {module.students} />
            ))}
        </ul>
    </>)
}
