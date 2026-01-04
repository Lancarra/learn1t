import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    useGetTeachersQuery,
    usePutAssignStudentMutation,
} from "../../redux/admin/AdminList.js";
import styles from "./assignTeacher.module.css";

export const AssignTeacher = ({ studentId, toggleModal }) => {
    const { data, isLoading } = useGetTeachersQuery();
    const [assignStudent, { isLoading: isAssigning }] =
        usePutAssignStudentMutation();

    const [teacher, setTeacher] = useState("");

    useEffect(() => {
        if (!teacher && data?.teachers?.length) {
            setTeacher(data.teachers[0].username);
        }
    }, [data, teacher]);

    const getErrorMessage = (err) => {
        const raw =
            err?.data?.message ||
            err?.data?.error ||
            err?.error ||
            err?.message ||
            "";

        const text = String(raw).toLowerCase();

        if (
            text.includes("already") ||
            text.includes("exists") ||
            text.includes("assigned") ||
            text.includes("duplicate")
        ) {
            return "This teacher is already assigned to this student.";
        }

        if (raw) return String(raw);

        return "This teacher is already assigned to this student.";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selected = data?.teachers?.find((t) => t.username === teacher);
        if (!selected?.userId) {
            toast.error("Please select a teacher.");
            return;
        }

        try {
            await assignStudent({
                teacherId: selected.userId,
                operation: "Add",
                studentsId: [studentId],
            }).unwrap();

            toast.success("Teacher successfully assigned.");
            toggleModal?.();
        } catch (err) {
            toast.error(getErrorMessage(err));
        }
    };

    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <div className={styles.headText}>
                    <h3 className={styles.title}>Assign Teacher</h3>
                    <p className={styles.subtitle}>Choose a teacher for this student</p>
                </div>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Teacher
                    <div className={styles.selectWrap}>
                        <select
                            className={styles.select}
                            value={teacher}
                            onChange={(e) => setTeacher(e.target.value)}
                            disabled={isLoading || !data?.teachers?.length}
                        >
                            {data?.teachers?.map((t) => (
                                <option key={t.userId} value={t.username}>
                                    {t.username}
                                </option>
                            ))}
                        </select>
                    </div>
                </label>

                <div className={styles.actions}>
                    <button
                        type="button"
                        className={`${styles.btn} ${styles.cancel}`}
                        onClick={toggleModal}
                        disabled={isAssigning}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className={`${styles.btn} ${styles.submit}`}
                        disabled={isLoading || isAssigning || !teacher}
                    >
                        {isAssigning ? "Assigning..." : "Assign Teacher"}
                    </button>
                </div>
            </form>
        </div>
    );
};
