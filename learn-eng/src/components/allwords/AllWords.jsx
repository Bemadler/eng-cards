import Footer from '../footer/Footer.jsx';
import React, { useState, useContext } from 'react';
import styles from './AllWords.module.css';
import DeleteButton from './DeleteButton.jsx';
import { WordContext } from '../../contexts/WordContext.jsx';

const WordList = () => {
  const { wordList, isLoading, error, updateWord, deleteWord } = useContext(WordContext);
  const [editingWord, setEditingWord] = useState(null);
  const [emptyInputs, setEmptyInputs] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);


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
      await updateWord(updatedWord);
      setEditingWord(null);
    } catch (error) {
      console.error('Ошибка обновления слова:', error);
    }
  };

  const cancelEditing = () => {
    setEditingWord(null);
  };

  const handleDeleteWord = async (wordId) => {
    try {
        setIsDeleting(true);

  await deleteWord(wordId);
      setIsDeleting(false);
    } catch (error) {
      console.error('Ошибка при удалении слова:', error);
      setIsDeleting(false);
    }
  };
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

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
                    {isDeleting 
                    ? <DeleteButton  
                    onDelete={deleteWord}
                    wordId={word.id} 
                    /> 
                    : <button onClick={() => deleteWord(word.id)}>Удалить</button>}
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