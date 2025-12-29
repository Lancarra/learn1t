/*
import {useEffect, useState} from 'react'
import {useGetUserByIdQuery} from "../../redux/admin/AdminList.js";
import {useGetStudentsByTeacherQuery} from "../../redux/teacher/TeacherList.js";
import {useUpdateModuleMutation} from "../../redux/modules/moduleOperations.js";
import {useParams} from "react-router-dom";

export const ManageCourseModule = ({ id, moduleName, moduleLevel, moduleDescription, students}) => {
    const {teacherId} = useParams();
    const {data} = useGetUserByIdQuery(teacherId);
    const {data:studentData} = useGetStudentsByTeacherQuery(teacherId);
    const [updateInfoModule] = useUpdateModuleMutation();
    const [name, setName] = useState(moduleName)
    const [description, setDescription] = useState(moduleDescription)
    const [level, setLevel] = useState(moduleLevel)
    const [addStudents, setAddStudents] = useState([])
    const [deleteStudents, setDeleteStudents] = useState([])
    const [studentToRender, setStudentToRender] = useState(studentData?.students ?? [])

    const handleAddStudent = (id) => {
        setAddStudents([...addStudents, id])
    }

    const handleDeleteStudent = (id) => {
        setDeleteStudents([...deleteStudents, id])
    }

    const handleInputChange = (e) => {
        const {value, name} = e.target
        switch (name) {
            case 'name':
                setName(value)
                return;
            case 'description':
                setDescription(value)
            return;
            case 'level':
                setLevel(value)
            return;
            default:
                return;
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        updateInfoModule({
            id: id,
            name: moduleName,
            description: moduleDescription,
            learnLevel: moduleLevel,
            userId: teacherId,
            studentsAdd: addStudents,
            studentsRemove: deleteStudents,
        });
    }

/!*    useEffect(() => {
        const studentsToRender = studentData?.students.filter(student =>
            !students.some(s => s.username === student.username)
        )
        setStudentToRender(studentsToRender)
    }, [students, studentData?.students])*!/

    useEffect(() => {
        if (!studentData?.students || !students) return;

        const moduleUsernames = new Set(
            students.map(s => s.username)
        );

        const studentsToRender = studentData.students.filter(
            student => !moduleUsernames.has(student.username)
        );

        setStudentToRender(studentsToRender);
    }, [students, studentData, addStudents, deleteStudents]);
    console.log("+++", studentToRender)
    console.log("---", students)
    return<form onSubmit={handleSubmit}>
        <h2>Manage Module</h2>
        <label>
            Module Name:
            <input type="text" value={name} name="name" onChange={handleInputChange}/>
        </label>
        <label>
            Module Learn Level:
            <input type="text" value={description} name="description" onChange={handleInputChange}/>
        </label>
        <label>
            Module Description:
            <input type="text" value={level} name="level" onChange={handleInputChange}/>
        </label>
        <ul>
            {studentToRender?.map(({userId, username})=><li key={userId}>
                {username}
                <button type = "button" onClick={()=>handleAddStudent(userId)}> Add</button>

            </li>)}
        </ul>
        <ul>
            {students?.map(({userId, username})=><li key={userId}>
            {username}
                <button type = "button" onClick={()=>handleDeleteStudent(userId)}> Delete</button>

            </li>)}
        </ul>
        <button type="submit">Save changes</button>
    </form>
}*/
import {useEffect, useState} from 'react'
import {useGetUserByIdQuery} from "../../redux/admin/AdminList.js";
import {useGetStudentsByTeacherQuery} from "../../redux/teacher/TeacherList.js";
import {
    useUpdateModuleMutation,
    useDeleteModuleMutation
} from "../../redux/modules/moduleOperations.js";
import {useParams} from "react-router-dom";
import styles from "./manageCourseModule.module.css"

export const ManageCourseModule = ({ id, moduleName, moduleLevel, moduleDescription, students, toggleModal }) => {
    const { teacherId } = useParams();
    const { data } = useGetUserByIdQuery(teacherId);
    const { data: studentData } = useGetStudentsByTeacherQuery(teacherId);
    const [updateInfoModule] = useUpdateModuleMutation();
    const [deleteModule] = useDeleteModuleMutation();

    const [name, setName] = useState(moduleName)
    const [description, setDescription] = useState(moduleDescription)
    const [level, setLevel] = useState(moduleLevel)

    const [addStudents, setAddStudents] = useState([]);
    const [deleteStudents, setDeleteStudents] = useState([]);

    const [moduleStudents, setModuleStudents] = useState(students ?? []);
    const [studentToRender, setStudentToRender] = useState([]);

    useEffect(() => {
        if (!studentData?.students) return;

        const moduleUsernames = new Set(moduleStudents.map(s => s.username));

        setStudentToRender(
            studentData.students.filter(student => !moduleUsernames.has(student.username))
        );
    }, [studentData, moduleStudents]);

    const handleAddStudent = (userId) => {
        const student = studentData.students.find(s => s.userId === userId);
        if (!student) return;

        setAddStudents(prev => [...prev, userId]);
        setDeleteStudents(prev => prev.filter(id => id !== userId));
        setModuleStudents(prev => [...prev, student]);
    };

    const handleDeleteStudent = (userId) => {
        setDeleteStudents(prev => [...prev, userId]);
        setAddStudents(prev => prev.filter(id => id !== userId));
        setModuleStudents(prev => prev.filter(s => s.userId !== userId));
    };

    const handleDeleteModule = async (id) => {
       await deleteModule({id});
        toggleModal()
    }

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'name':
                setName(value);
                return;
            case 'description':
                setDescription(value);
                return;
            case 'level':
                setLevel(value);
                return;
            default:
                return;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateInfoModule({
            id,
            name,
            description,
            learnLevel: level,
            userId: teacherId,
            studentsAdd: addStudents,
            studentsRemove: deleteStudents,
        });
        toggleModal();
    };
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.header}>
                <div>
                    <h2 className={styles.title}>Manage Module</h2>
                    <p className={styles.subtitle}>Edit module info and manage students</p>
                </div>
                <div className={styles.headerRight}>
                    <button type="button" onClick={() => handleDeleteModule(id)}>Delete Module</button>
                </div>
            </div>

            <div className={styles.fields}>
                <label className={styles.field}>
                    <span className={styles.label}>Module Name</span>
                    <input className={styles.input} type="text" value={name} name="name" onChange={handleInputChange} />
                </label>

                <label className={styles.field}>
                    <span className={styles.label}>Module Learn Level</span>
                    <input className={styles.input} type="text" value={level} name="level" onChange={handleInputChange} />
                </label>

                <label className={styles.fieldFull}>
                    <span className={styles.label}>Module Description</span>
                    <input
                        className={styles.input}
                        type="text"
                        value={description}
                        name="description"
                        onChange={handleInputChange}
                    />
                </label>
            </div>

            <div className={styles.listsGrid}>
                <section className={styles.listCard}>
                    <h3 className={styles.listTitle}>Available Students</h3>

                    <ul className={styles.list}>
                        {studentToRender?.map(({ userId, username }) => (
                            <li className={styles.listRow} key={userId}>
                                <span className={styles.username}>{username}</span>
                                <button className={styles.addBtn} type="button" onClick={() => handleAddStudent(userId)}>
                                    Add
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className={styles.listCard}>
                    <h3 className={styles.listTitle}>Module Students</h3>

                    <ul className={styles.list}>
                        {moduleStudents?.map(({ userId, username }) => (
                            <li className={styles.listRow} key={userId}>
                                <span className={styles.username}>{username}</span>
                                <button className={styles.deleteBtn} type="button" onClick={() => handleDeleteStudent(userId)}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            <div className={styles.actions}>
                <button className={styles.saveBtn} type="submit">
                    Save changes
                </button>
            </div>
        </form>
    );
};