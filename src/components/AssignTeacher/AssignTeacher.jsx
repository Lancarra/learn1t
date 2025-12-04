import {useState} from 'react'
import {useGetTeachersQuery, usePutAssignStudentMutation} from "../../redux/admin/AdminList.js";

export const AssignTeacher = ({studentId}) => {
    const {data} = useGetTeachersQuery();
    const [teacher, setTeacher] = useState(data?.teachers[0].username);
    const [assignStudent] = usePutAssignStudentMutation();
    const handleTeacherChange = (e) => {
        setTeacher(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const teacherId = data?.teachers.find((selectedTeacher) => selectedTeacher.username === teacher);
        console.log(teacherId);
        assignStudent({
            teacherId: teacherId?.userId,
            operation: "Add",
            studentsId: [studentId]
        })
    }


    return <form onSubmit={handleSubmit}>
        <select value={teacher} onChange={handleTeacherChange}>
            {data?.teachers.map((teacher) => <option value = {teacher.username}>
                {teacher.username}
            </option>)}
        </select>
        <button type = "submit">Assign Teacher</button>
    </form>
}