
import React, { useContext, useState } from 'react';
import styles from './NewWord.module.css';
import LoadingPage from '../loadingpage/LoadingPage.jsx';
import { WordContext } from '../../contexts/WordContext.jsx';

const NewWord = () => {
  const { addWord } = useContext(WordContext);
  const [newWord, setNewWord] = useState({
    id: "",
    english: "",
    transcription: "",
    russian: "",
    tags: "",
    tags_json: "[]"
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewWord(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await addWord(newWord);
      setNewWord({
        id: "",
        english: "",
        transcription: "",
        russian: "",
        tags: "",
        tags_json: "[]"
      });
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка при добавлении слова. Попробуйте снова.');
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2500);  
    }
  };


  return (
    <div className={styles.NewWord}>
      <h2>Добавить новое слово</h2>
      <form onSubmit={handleSubmit} method='POST'>
        <input
          type="text"
          name="english"
          value={newWord.english}
          onChange={handleChange}
          placeholder="слово на англ. языке"
          required
        />
        <input
          type="text"
          name="transcription"
          value={newWord.transcription}
          onChange={handleChange}
          placeholder="транскрипция"
        />
        <input
          type="text"
          name="russian"
          value={newWord.russian}
          onChange={handleChange}
          placeholder="перевод"
          required
        />
        <input
          type="text"
          name="tags"
          value={newWord.tags}
          onChange={handleChange}
          placeholder="теги"
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading
          ?
          'Добавление...'
          :
          'Добавить'}
        </button>
        {loading && <LoadingPage />}
      </form>
    </div>
  );
};

export default NewWord;

