
import Footer from '../../components/footer/Footer.jsx';
import React, { useState, useEffect } from 'react';
import styles from './AllWordsButton.module.css';

const WordList = () => {
  const [wordList, setWordList] = useState([]);
  const [editingWord, setEditingWord] = useState(null);
  const [emptyInputs, setEmptyInputs] = useState([]);


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
    checkEmptyInputs(word);
  };

  const checkEmptyInputs = (word) => {
    const inputs = Object.keys(word);
    const emptyInputs = inputs.filter(input => word[input] === '');
    setEmptyInputs(emptyInputs);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingWord((prevWord) => ({...prevWord, [name]: value }));
    checkEmptyInputs({... editingWord, [name]: value});
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
                  <td className={emptyInputs.includes('english')
                ? styles.emptyInput
              : ""}>
                    <input
                      type="text"
                      value={editingWord.english}
                      name="english"
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className={emptyInputs.includes('transcription')
                ? styles.emptyInput
              : ''}>
                    <input
                      type="text"
                      value={editingWord.transcription}
                      name="transcription"
                      onChange={handleInputChange} 
                    />
                  </td>
                  <td className={emptyInputs.includes('russian')
                ? styles.emptyInput
              : ''}>
                    <input
                      type="text"
                      value={editingWord.russian}
                      name="russian"
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className={emptyInputs.includes('tags')
                ? styles.emptyInput
              : '' }>
                    <input
                      type="text"
                      value={editingWord.tags}
                      name="tags"
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <button onClick={() => saveWord(editingWord)} disabled={emptyInputs.length > 0 }>Сохранить</button>
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
