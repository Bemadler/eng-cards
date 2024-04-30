import Footer from '../../components/footer/Footer.jsx';
import React, { useState, useEffect } from 'react';
import styles from './AllWordsButton.module.css';

const WordList = () => {
  const [wordList, setWordList] = useState([]);
  const [editingWord, setEditingWord] = useState(null);

  useEffect(() => {
    fetchWordList();
  }, []);

  const fetchWordList = async () => {
    try {
      const response = await fetch('https://itgirlschool.justmakeit.ru/api/words');
      if (!response.ok) {
        throw new Error('Ошибка при загрузке слов');
      }
      const data = await response.json();
      setWordList(data);
      console.log('Список слов после обновления:', data); 
    } catch (error) {
      console.error('Ошибка', error);
    }
  };

  const startEditing = (word) => {
    setEditingWord(word);
  };

  const saveWord = async (updatedWord) => {
    try {
      const response = await fetch(`http://itgirlschool.justmakeit.ru/api/words/${updatedWord.id}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedWord),
      });

      if (!response.ok) {
        throw new Error('Ошибка при сохранении слова');
      }

      const data = await response.json();
      
      setWordList((prevWordList) => prevWordList.map(word => word.id === data.id ? data : word));
      console.log('Список слов после сохранения:', wordList);
      setEditingWord(null);
      console.log('Список слов после удаления:', wordList);
    } catch (error) {
      console.error('Ошибка обновления слова:', error);
    }
  };

  const cancelEditing = () => {
    setEditingWord(null);
  };

  const deleteWord = async (wordId) => {
    try {
        const response = await fetch(`https://itgirlschool.justmakeit.ru/api/words/${wordId}/delete`, {
            method: 'POST',
        });


        if (response.ok) {
            setWordList((prevWordList) => prevWordList.filter(word => word.id !== wordId));
            console.log('Список слов после удаления:', wordList);
        }
    } catch (error) {
        console.error('Ошибка при удалении слова:', error);
    }
};

  return (
    <div className={styles.AddWordBox}>
      <h2 className={styles.AddWordHeader}>Список слов</h2>
      <table className={styles.wordListTable}>
        <thead>
          <tr>
            <th>Слово</th>
            <th>Транскрипция</th>
            <th>Перевод</th>
            <th>Тег</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {wordList.map((word) => (
            <tr key={word.id}>
              {editingWord && editingWord.id === word.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editingWord.english}
                      onChange={(e) =>
                        setEditingWord({ ...editingWord, english: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editingWord.transcription}
                      onChange={(e) =>
                        setEditingWord({ ...editingWord, transcription: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editingWord.russian}
                      onChange={(e) =>
                        setEditingWord({ ...editingWord, russian: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editingWord.tags}
                      onChange={(e) =>
                        setEditingWord({ ...editingWord, tags: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <button onClick={() => saveWord(editingWord)}>Сохранить</button>
                    <button onClick={cancelEditing}>Отменить</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{word.english}</td>
                  <td>{word.transcription}</td>
                  <td>{word.russian}</td>
                  <td>{word.tags}</td>
                  <td>
                    <button onClick={() => startEditing(word)}>Редактировать</button>
                    <button onClick={() => deleteWord(word.id)}>Удалить</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
        <Footer /> 
    </div>
  );
};

export default WordList;
