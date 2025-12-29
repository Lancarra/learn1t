import { useState, useRef, useEffect } from "react";
import { TestList } from "../TestList/TestList.jsx";
import styles from "./testDropdown.module.css";

export const TestsDropdown = ({ id }) => {
    const [showTests, setShowTests] = useState(false);
    const ref = useRef(null);

    const toggleTests = () => setShowTests((v) => !v);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setShowTests(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className={styles.wrapper}>
            <button type="button" onClick={toggleTests} className={styles.button}>
                Tests ▾
            </button>

            {showTests && (
                <div className={styles.dropdown}>
                    <TestList id={id} />
                </div>
            )}
        </div>
    );
};
