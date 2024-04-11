import ArrowRight from "../assets/icons/ArrowRight.png";
import ArrowLeft from "../assets/icons/ArrowLeft.png";
import React, { useState, useEffect } from "react";
import styles from "./Main.module.css";

const Main = () => {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const response = await fetch(
        "https://itgirlschool.justmakeit.ru/api/words"
      );
      const data = await response.json();
      setWords(data);
      setShowTranslation(false); 
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  };

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  const handleNextWord = () => {
    if (currentIndex === words.length - 1) {
      alert(
        "Слова закончились! Можете дополнить вашу библиотеку слов в блоке ниже!"
      );
      return;
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setShowTranslation(false); 
  };

  const handlePrevWord = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((prevIndex) => prevIndex - 1);
    setShowTranslation(false); 
  };

  const currentWordIndex = currentIndex + 1;
  const totalWordsCount = words.length;

  return (
    <div className={styles.card}>
      <img
        onClick={handlePrevWord}
        className={styles.ArrowLeft}
        src={ArrowLeft}
        alt="arrow left"
      />

      {words.length > 0 && (
        <div className={styles.SmallCard}>
          <h2 className={styles.MainCardHeader}>Карточка с новым словом</h2>
          <h2>{words[currentIndex].english}</h2>
          {words[currentIndex].transcription && (
            <p className={styles.transcription}>
              {words[currentIndex].transcription}
            </p>
          )}
          {showTranslation && (
            <h2 className={styles.green}>{words[currentIndex].russian}</h2>
          )}
          {!showTranslation && (
            <button onClick={toggleTranslation}>Показать перевод</button>
          )}
          <p>
            {currentWordIndex}/{totalWordsCount}
          </p>
        </div>
      )}

      <img
        onClick={handleNextWord}
        className={styles.ArrowRight}
        src={ArrowRight}
        alt="arrow right"
      />
    </div>
  );
};

export default Main;
