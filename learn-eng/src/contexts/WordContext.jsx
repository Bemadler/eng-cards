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

  return (
    <WordContext.Provider value={{ wordList, isLoading, error }}>
      {children}
    </WordContext.Provider>
  );
};
