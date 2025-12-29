import {useGetDictionaryQuizQuery} from "../../redux/quiz/quizOperations.js"
import {NavLink} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import styles from "./testList.module.css";

export const TestList = ({id}) => {
    const {data} = useGetDictionaryQuizQuery(id);
    const testCards = data?.testCards ?? [];
    const pageSize = 10;
    const [page, setPage] = useState(1);

    useEffect(() => setPage(1), [id]);

    const totalPages = Math.max(1, Math.ceil(testCards.length / pageSize));

    useEffect(() => {if (page > totalPages) setPage(totalPages);},
        [page, totalPages]);

    const visibleCards = useMemo(() => {
        const start = (page - 1) * pageSize;
        return testCards.slice(start, start + pageSize);
    }, [testCards, page]);

    const goPrev = () => setPage((p) => Math.max(1, p - 1));
    const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

    const paginationItems = useMemo(() => {
        const siblings = 1; // сколько соседей показывать слева/справа
        const items = [];

        const left = Math.max(2, page - siblings);
        const right = Math.min(totalPages - 1, page + siblings);

        items.push(1);

        if (left > 2) items.push("…");
        for (let p = left; p <= right; p++) items.push(p);
        if (right < totalPages - 1) items.push("…");
        if (totalPages > 1) items.push(totalPages);
        return items;
    }, [page, totalPages]);

    return (
        <div className={styles.wrapper}>
            <ul className={styles.list}>
                {visibleCards.map(({ cardId, name, userName }) => {
                    if (name !== "test1" ){
                        return <li key={cardId} className={styles.item}>
                            <NavLink to={`/test/${cardId}`} className={styles.link}>
                                <p className={styles.name}>Name: {name}</p>
                                <p className={styles.userName}>User Name: {userName}</p>
                            </NavLink>
                            <NavLink to={`/test/info/answers/${cardId}`}>Show Results</NavLink>
                        </li>
                    }
                }
                )}
            </ul>

            {testCards.length > 0 && (
                <div className={styles.pagination}>
                    <button type="button" className={styles.pageBtn} onClick={goPrev} disabled={page === 1}>
                        Prev
                    </button>

                    <div className={styles.pageNumbers}>
                        {paginationItems.map((it, idx) =>
                                it === "…" ? (
                                    <span key={`dots-${idx}`} className={styles.dots}>…</span>
                                ) : (
                                    <button key={it} type="button" className={`${styles.pageNumber} ${it === page ? styles.active : ""}`}
                                        onClick={() => setPage(it)}>{it}
                                    </button>
                                )
                        )}
                    </div>

                    <button type="button" className={styles.pageBtn} onClick={goNext} disabled={page === totalPages}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};