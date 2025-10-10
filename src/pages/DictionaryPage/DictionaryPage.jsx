import {NavLink, useParams} from "react-router-dom";
import {useGetDefinitionsQuery} from "../../redux/definitionList/definitionaList.js";
import {useEffect, useState} from "react";
import {Modal} from "../../components/Modal/Modal.jsx";
import {NewDefinitionForm} from "../../components/NewDefinitionForm/NewDefinitionForm.jsx";
import styles from "./dictionaryPage.module.css";
import {DictionaryCardItem} from "../../components/DictionaryCardItem/DictionaryCardItem.jsx";
import {CreateNewQuizForm} from "../../components/CreateNewQuizForm/CreateNewQuizForm.jsx";

export const DictionaryPage = () => {
    const { id } = useParams();
    const { data } = useGetDefinitionsQuery(id);
    const [isShow, setIsShow] = useState(false);
    const [search, setSearch] = useState("");
    const [isShowModal, setIsShowModal] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isShowDefinitionModal, setIsShowDefinitionModal] = useState(false);
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

    return (
        <>
            <h1 className={styles.dictTitle}>Word in Dictionary ...</h1>

            <div className={styles.dictToolbar}>
                <button
                    type="button"
                    onClick={toggleModal}
                    className={`${styles.dictPill} ${styles.dictPillPrimary}`}
                >
                    Create new definition
                </button>
                <button type="button" className={styles.dictPill} onClick={toggleDefinitionModal}>
                    Learn definitions

{/*
                    <NavLink to={`/quiz/${data?.definitions[0].dictionaryId}}`}>Learn definitions</NavLink>
*/}

                    </button>
                <button type="button" onClick={toggleShow} className={styles.dictPill}>Find definition</button>
                {isShow && (
                    <input type="text" value={search} onChange={handleInputChange} className={styles.dictSearch}
                        placeholder="Search..."
                    />
                )}
            </div>

            <div className={styles.dictPreview}>
                <button type="button" onClick={handlePrev} className={styles.dictArrow}>←</button>

                {/*<div className={styles.dictPreviewCard}>
                    <img src={currentItem?.imageURL} alt="" className={styles.dictPreviewImg}/>
                    <p className={styles.dictPreviewWord}>{currentItem?.word}</p>

                    <p className={styles.dictPreviewMeaning}>{currentItem?.meaning}</p>

                </div>*/}
                <div
                    className={`${styles.dictPreviewCard} ${styles.flipCard}`}
                    onClick={toggleFlip}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleFlip()}
                    aria-pressed={isFlipped}
                    title="Click to flip"
                >
                    <div className={`${styles.flipInner} ${isFlipped ? styles.flipped : ""}`}>
                        <div className={styles.flipFront}>
                            <img src={currentItem?.imageURL} alt="" className={styles.dictPreviewImg}/>
                            <p className={styles.dictPreviewWord}>{currentItem?.word}</p>
                        </div>

                        <div className={styles.flipBack}>
                            <img src={currentItem?.imageURL} alt="" className={styles.dictPreviewImg}/>
                            <p className={styles.dictPreviewMeaning}>{currentItem?.meaning}</p>
                        </div>
                    </div>
                </div>

                <button type="button" onClick={handleNext} className={styles.dictArrow}>→</button>
            </div>

            <ul className={styles.dictList}>
                {data?.definitions?.map(({ id, word, meaning, blobId, imageURL, dictionaryId }) => (
                    <DictionaryCardItem id={id} word={word} meaning={meaning} blobId={blobId} imageURL={imageURL} />
                ))}
            </ul>

            {isShowModal && (
                <Modal toggleModal={toggleModal}>
                    <NewDefinitionForm togglemodal={toggleModal} id={id}/>
                </Modal>
            )}
            {isShowDefinitionModal && <Modal toggleModal={toggleDefinitionModal}>
                <CreateNewQuizForm togglemodal={toggleDefinitionModal} dictionaryId={id} definitionId={data?.definitions[0].id}/>
            </Modal>}
        </>
    );
};
