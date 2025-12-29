import {Statistics} from "../../components/Statistics/Statistics.jsx"
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useResultByDictionaryMutation, useGetInfoQuizQuery} from "../../redux/quiz/quizOperations.js"
import {useAuth} from "../../hooks/useAuth.js";
import styles from "./studentsResult.module.css";

export const StudentsResult = () => {
    const {user} = useAuth();
    const {cardId} = useParams();
    const {data:nameQuiz} = useGetInfoQuizQuery(cardId);
    const [getStudentsResults] = useResultByDictionaryMutation();
    const [result, setResult] = useState([]);

    useEffect(() => {
        const dictionaryId = JSON.parse(localStorage.getItem("id"));
        const getStudentaStats = async () => {
            const res = await getStudentsResults({
                teacherId: user.userId,
                dictionaryId: dictionaryId
            });
            const data = res?.data?.result.filter((value)=> value.testName === nameQuiz?.name);
            setResult(data);
        }
        getStudentaStats();
    }, [nameQuiz]);

    return (
        <section className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Students Results</h1>
                    <p className={styles.subtitle}>
                        Results for test: <b>{nameQuiz?.name || "—"}</b>
                    </p>
                </div>

                <div className={styles.list}>
                    {result.map((res, idx) => (
                        <Statistics variant={true} result={res} key={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};