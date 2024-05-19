import React, { createContext, useState, useEffect } from 'react';

export const WordContext = createContext();

export const WordProvider = ({ children }) => {
  const [wordList, setWordList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWordList = async () => {
      try {
        const response = await fetch('http://itgirlschool.justmakeit.ru/api/words');
        if (!response.ok) {
          throw new Error('Ошибка при загрузке списка слов');
        }
        const data = await response.json();
        setWordList(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка', error);
        setError(error);
        setIsLoading(false);
      }
    };
    fetchWordList();
  }, []);
  const addWord = async (word) => {
    try {
      const response = await fetch("/api/words/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(word),
      });
      if (!response.ok) {
        throw new Error('Ошибка при добавлении слова');
      }
      const newWord = await response.json();
      setWordList((prevWordList) => [...prevWordList, newWord]);
    } catch (error) {
      console.error('Ошибка добавления слова:', error);
      throw error;
    }
  };

  const updateWord = async (updatedWord) => {
    try {
      const response = await fetch(`http://itgirlschool.justmakeit.ru/api/words/${updatedWord.id}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedWord),
      });
      if (!response.ok) {
        throw new Error('Ошибка при обновлении слова');
      }
      const data = await response.json();
      setWordList((prevWordList) =>
        prevWordList.map((word) => (word.id === data.id ? data : word))
      );
    } catch (error) {
      console.error('Ошибка обновления слова:', error);
    }
  };

  const deleteWord = async (wordId) => {
    try {
      const response = await fetch(`http://itgirlschool.justmakeit.ru/api/words/${wordId}/delete`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Ошибка при удалении слова');
      }
      setWordList((prevWordList) =>
        prevWordList.filter((word) => word.id !== wordId)
      );
    } catch (error) {
      console.error('Ошибка при удалении слова:', error);
    }
  };

  return (
    <WordContext.Provider value={{ wordList, isLoading, error, addWord, updateWord, deleteWord }}>
      {children}
    </WordContext.Provider>
  );
};
