
import React, { useState } from 'react';
import styles from './NewWord.module.css';

const NewWord = ({ onAddWord }) => {
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
      await handleAddWord(newWord);
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
      setLoading(false); 
    }
  };

  const handleAddWord = async (word) => {
    try {
      const response = await fetch("http://itgirlschool.justmakeit.ru/api/words/add");
      if (!response.ok) {
        throw new Error('Ошибка при загрузке списка слов');
      }
      const wordList = await response.json();
      
      const newId = wordList.length > 0 
      ? wordList[wordList.length - 1].id + 1 
      : 1;

      console.log('Список слов после обновления:', wordList);
      
      const responseAdd = await fetch(`http://itgirlschool.justmakeit.ru/api/words/${word.id}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...word, id: newId }), 
      });

      console.log( { ...word, id: newId })
  
      if (!responseAdd.ok) {
        throw new Error('Ошибка при добавлении слова');
      }
  
      const data = await responseAdd.json();
      if (onAddWord) {
        onAddWord(data);
      }
    } catch (error) {
      console.error('Ошибка:', error);
      throw error; 
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
      </form>
    </div>
  );
};

export default NewWord;

