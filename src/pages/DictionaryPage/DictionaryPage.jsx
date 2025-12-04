import {NavLink, useParams} from "react-router-dom";
import {useGetDefinitionsQuery} from "../../redux/definitionList/definitionaList.js";
import {useEffect, useState} from "react";
import {Modal} from "../../components/Modal/Modal.jsx";
import {NewDefinitionForm} from "../../components/NewDefinitionForm/NewDefinitionForm.jsx";
import styles from "./dictionaryPage.module.css";
import {DictionaryCardItem} from "../../components/DictionaryCardItem/DictionaryCardItem.jsx";
import {CreateNewQuizForm} from "../../components/CreateNewQuizForm/CreateNewQuizForm.jsx";
import {CreateTestForm} from "../../components/CreateTestForm/CreateTestForm.jsx"

export const DictionaryPage = () => {
    const { id } = useParams();
    localStorage.setItem("id", JSON.stringify(id));
    const { data } = useGetDefinitionsQuery(id);
    const [isShow, setIsShow] = useState(false);
    const [search, setSearch] = useState("");
    const [isShowModal, setIsShowModal] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isShowDefinitionModal, setIsShowDefinitionModal] = useState(false);
    const [isShowTestModal, setIsShowTestModal] = useState(false);
    const toggleTestModal = () => setIsShowTestModal(!isShowTestModal);
    const toggleDefinitionModal = () => setIsShowDefinitionModal(!isShowDefinitionModal);
    const toggleModal = () => setIsShowModal(!isShowModal);
    const handleInputChange = (e) => setSearch(e.target.value);
    const toggleShow = () => setIsShow(!isShow);
    const [isFlipped, setIsFlipped] = useState(false);

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
            <div className={styles.dashboardPage}>
                <div className={styles.dashboardContainer}>
                    <h1 className={styles.dictTitle}>Words in Dictionary</h1>

            <div className={styles.dictToolbar}>
                <button type="button" onClick={toggleModal}
                    className={`${styles.dictPill} ${styles.dictPillPrimary}`}>
                    Create new definition
                </button>
                <button type="button" className={styles.dictPill} onClick={toggleDefinitionModal}>
                    Learn Definitions
                    </button>
                <button type="button" className={styles.dictPill} onClick={toggleTestModal}>
                    Create Test
                </button>
                <button type="button" onClick={toggleShow} className={styles.dictPill}>Find definition</button>
                {isShow && (
                    <input value ={search} onChange={handleInputChange} className={styles.searchInput} type="text" placeholder="Enter a definition name..."/>
                )}
            </div>
            <div className={styles.dictPreview}>
            <button type="button" onClick={handlePrev} className={styles.dictArrow}>←</button>

            <div
                className={`${styles.flipCard}`}
                onClick={toggleFlip}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleFlip()}
            >
                <div className={`${styles.flipInner} ${isFlipped ? styles.flipped : ""}`}>
                    <div className={styles.flipFront}>
                        {currentItem?.imageURL  && <img src={currentItem?.imageURL} alt=""/>}
                        <p className={styles.dictPreviewWord}>{currentItem?.word}</p>
                    </div>
                    <div className={styles.flipBack}>
                        {currentItem?.imageURL && <img src={currentItem?.imageURL} alt=""/>}
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
                    <NewDefinitionForm togglemodal={toggleModal} id={id}/>
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
