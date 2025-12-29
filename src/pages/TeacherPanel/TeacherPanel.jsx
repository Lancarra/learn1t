import {NavLink, useParams} from "react-router-dom";
import {useGetUserByIdQuery} from "../../redux/admin/AdminList.js";
import {useGetByTeacherIdModulesQuery} from "../../redux/modules/moduleOperations.js";
import {CiSearch} from "react-icons/ci";
import {useState} from "react";
import styles from "./teacherPanel.module.css"
import {useAuth} from "../../hooks/useAuth.js";
import {Modal} from "../../components/Modal/Modal.jsx";
import {NewModuleForm} from "../../components/NewModuleForm/NewModuleForm.jsx";
import {ModuleListDashboard} from "../../components/ModuleListDashboard/ModuleListDashboard.jsx";

export const TeacherPanel = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const {teacherId} = useParams();
    const {user:{roleName}} = useAuth();
    const {data:user} = useGetUserByIdQuery(teacherId);
    const {data:modules} = useGetByTeacherIdModulesQuery(teacherId);
    const [keyWord, setKeyWord] = useState("");
    const handleInputChange = (e) => {
        setKeyWord(e.target.value);
    }
    const modulesArray = modules?.modules?.filter((module) =>
        module.name.toLowerCase().includes(keyWord.toLowerCase())
    ) || [];
    const toggleModal = () => setIsOpenModal(!isOpenModal);
    return (
        <section className={styles.teacherPanel}>
            <div className={styles.container}>
            <div className={styles.headerCard}>
                <div className={styles.teacherInfo}>
                    <div className={styles.avatarWrapper}>
                        {user?.blobId ? (
                            <img src={`http://127.0.0.1:10000/devstoreaccount1/user-images/${user.blobId}`} alt={user?.username} className={styles.avatarImg}/>
                        ) : (
                            <span className={styles.avatarFallback}>
                                {user?.username?.[0] || "?"}
                            </span>
                        )}
                    </div>

                    <div><h1 className={styles.teacherName}>{user?.username}</h1>
                        <p className={styles.teacherEmail}>{user?.email}</p>
                    </div>
                </div>

                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Active Modules</span>
                        <span className={styles.statValue}>{modules?.count || 0}</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Total Students</span>
                        <span className={styles.statValue}>{user?.studentsId?.length || 0}</span>
                    </div>
                </div>
            </div>

            <div className={`${styles.card} ${styles.modulesHeader}`}>
                <div className={styles.headerLeft}>
                    <h2 className={styles.sectionTitle}>
                        My Modules {modules?.count ? `(${modules.count})` : ""}
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        Manage your vocabulary modules and students
                    </p>
                </div>
                <div className={styles.headerRight}>
                    {roleName === "Teacher" && <button type="button" onClick={toggleModal}  className={styles.createModuleBtn}>Create Module</button>}
                    {roleName === "Teacher;" && <button type="button" onClick={toggleModal}  className={styles.createModuleBtn}>Create Module</button>}

                    <div className={styles.searchWrapper}>
                        <CiSearch className={styles.searchIcon}/>
                        <input
                            type="text"
                            value={keyWord}
                            onChange={handleInputChange}
                            placeholder="Search modules"
                            className={styles.searchInput}
                        />
                    </div>
                </div>
            </div>

            <ModuleListDashboard modulesArray={modulesArray}/>
            {isOpenModal && (
                <Modal toggleModal={toggleModal} >
                    <NewModuleForm togglemodal={toggleModal} title="Create module"/>
                </Modal>
            )}
            </div>
        </section>

    );
};