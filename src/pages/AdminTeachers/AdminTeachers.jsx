import {useState} from "react";
import {CiSearch} from "react-icons/ci";
import {useGetTeachersQuery} from "../../redux/admin/AdminList.js";
import styles from "./adminTeachers.module.css"
import {AdminTeacherItem} from "../../components/AdminTeacherItem/AdminTeacherItem.jsx";

export const AdminTeachers = () => {
    const {data:teachers} = useGetTeachersQuery();
    const [keyWord, setKeyWord] = useState("");
    const handleInputChange = (e) => {
        setKeyWord(e.target.value);
    }
    const teachersArray = teachers?.teachers?.filter((teacher) =>
        teacher.username.toLowerCase().includes(keyWord.toLowerCase())
    ) || [];

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
                       <AdminTeacherItem key={teacher.userId} teacher={teacher} />
                    ))}
                </ul>
            </div>
            </div>
        </section>
    );
};