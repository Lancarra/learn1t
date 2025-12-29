import {NavLink, useParams} from "react-router-dom";
import {useGetDefinitionsQuery} from "../../redux/definitionList/definitionaList.js";
import {useEffect, useState} from "react";
import {Modal} from "../../components/Modal/Modal.jsx";
import {NewDefinitionForm} from "../../components/NewDefinitionForm/NewDefinitionForm.jsx";
import styles from "./dictionaryPage.module.css";
import {DictionaryCardItem} from "../../components/DictionaryCardItem/DictionaryCardItem.jsx";
import {CreateNewQuizForm} from "../../components/CreateNewQuizForm/CreateNewQuizForm.jsx";
import {CreateTestForm} from "../../components/CreateTestForm/CreateTestForm.jsx"
import {CiSearch} from "react-icons/ci";
import {TestList} from "../../components/TestList/TestList.jsx";
import {TestsDropdown} from "../../components/TestsDropdown/TestsDropdown.jsx";
import {useAuth} from "../../hooks/useAuth.js";
import Speak from "../../components/Speak/Speak.jsx";
import SpeakSecond from "../../components/Speak2/SpeakSecond.jsx";
import SpeakWeb from "../../components/SpeakWeb/SpeakWeb.jsx";

export const DictionaryPage = () => {
    const { id } = useParams();
    const { user:{roleName, name} } = useAuth();
    localStorage.setItem("id", JSON.stringify(id));
    const { data } = useGetDefinitionsQuery(id);
    const [search, setSearch] = useState("");
    const [isShowModal, setIsShowModal] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isShowDefinitionModal, setIsShowDefinitionModal] = useState(false);
    const [isShowTestModal, setIsShowTestModal] = useState(false);
    const toggleTestModal = () => setIsShowTestModal(!isShowTestModal);
    const toggleDefinitionModal = () => setIsShowDefinitionModal(!isShowDefinitionModal);
    const toggleModal = () => setIsShowModal(!isShowModal);
    const handleInputChange = (e) => setSearch(e.target.value);
    const [isFlipped, setIsFlipped] = useState(false);
    const [showTests, setShowTests] = useState(false);

    const toggleTests = () => {
        setShowTests(!showTests);
    }

    useEffect(() => {
        setIsFlipped(false);
    }, [currentIndex]);
    const toggleFlip = () => setIsFlipped(f => !f);

    const handleNext = () => {
        if (!data?.definitions?.length) return;
        setCurrentIndex(prev => (prev === data.definitions.length - 1 ? 0 : prev + 1));
    };
    const handlePrev = () => {
        if (!data?.definitions?.length) return;
        setCurrentIndex(prev => (prev === 0 ? data.definitions.length - 1 : prev - 1));
    };

    const currentItem = data?.definitions?.[currentIndex];

    const definitions = data?.definitions?.filter(({word})=>word.toLowerCase().includes(search.toLowerCase()))

    return (
        <>
            <div className={styles["dashboard-page"]}>
                <div className={styles.container}>
                    <h1  className={styles["dashboard-greeting"]}>Words in Dictionary</h1>
                    <p className={styles["header-subtitle"]}>
                        Create and manage your vocabulary definitions for this dictionary.
                    </p>
                    <div className={styles["action-bar"]}>
                        <div className={styles["action-right"]}>
                            {roleName !== "Student" && (
                            <button type="button" onClick={toggleModal}>Create new definition</button>)}
                            {roleName == "Student" && (
                            <button type="button" onClick={toggleDefinitionModal}>Learn Definitions</button>)}
                            {roleName !== "Student" && (
                            <button type="button" onClick={toggleTestModal}>Create Test</button>)}
                            <div className={styles["search-wrapper"]}>
                                <CiSearch className={styles.searchIcon} />
                                <input value ={search} onChange={handleInputChange} className={styles.searchInput} type="text" placeholder="Enter a definition name..."/>
                            </div>
                        </div>
                        <div className={styles.testsRight}>
                            <TestsDropdown id={id} />
                        </div>
                    </div>
                <div className={styles.dictPreview}>
                    <button type="button" onClick={handlePrev} className={styles.dictArrow}>←</button>
                    <div className={`${styles.flipCard}`} onClick={toggleFlip} role="button"
                         tabIndex={0} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleFlip()}>
                        <div className={`${styles.flipInner} ${isFlipped ? styles.flipped : ""}`}>
                            <div className={styles.flipFront}>
                                {currentItem?.imageURL  && <img src={currentItem?.imageURL} alt=""/>}
                                <p className={styles.dictPreviewWord}>{currentItem?.word}</p>
{/*
                                   <Speak textToSpeak={currentItem?.word} />
*/}
{/*
                                <SpeakSecond textToSpeak={currentItem?.word} />
*/}
                                <SpeakWeb
                                    text={currentItem?.word}
                                    langKey="en"
                                />
                            </div>
                            <div className={styles.flipBack}>
                                <p className={styles.dictPreviewMeaning}>{currentItem?.meaning}</p>
                            </div>
                        </div>
                    </div>
                    <button type="button" onClick={handleNext} className={styles.dictArrow}>→</button>
                </div>
            <ul className={styles.dictList}>
                {definitions?.map(({ id, word, meaning, blobId, imageURL }) => (
                    <DictionaryCardItem id={id} word={word} meaning={meaning} blobId={blobId} imageURL={imageURL} />
                ))}
            </ul>
            </div>
        </div>

            {isShowModal && (
                <Modal toggleModal={toggleModal}>
                    <NewDefinitionForm togglemodal={toggleModal} id={id} title="Create definition"/>
                </Modal>
            )}
            {isShowDefinitionModal && <Modal toggleModal={toggleDefinitionModal}>
                <CreateNewQuizForm togglemodal={toggleDefinitionModal} dictionaryId={id}/>
            </Modal>}
            {isShowTestModal && <Modal toggleModal={toggleTestModal}>
                <CreateTestForm togglemodal={toggleTestModal} dictionaryId={id}/>
            </Modal>}
        </>
    );
};
