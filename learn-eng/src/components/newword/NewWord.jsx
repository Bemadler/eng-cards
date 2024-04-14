
import React, { useState } from 'react';
import styles from './NewWord.module.css';


const apiUrl = 'http://itgirlschool.justmakeit.ru/api/words/{id}/delete';//чтобы удалять слово, нужен этот url 

const NewWord = ({ onAddWord }) => {
  const [newWord, setNewWord] = useState({
    english: '',
    transcription: '',
    russian: '',
    tags: ''
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

      alert('Слово успешно добавлено!');
  
      setNewWord({
        english: '',
        transcription: '',
        russian: '',
        tags: ''
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

      const tagsJson = JSON.stringify([word.tags]);
  

      const requestData = {
        english: word.english,
        transcription: word.transcription,
        russian: word.russian,
        tags: word.tags,
        tags_json: tagsJson 
      };
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData), 
      });
  

      if (!response.ok) {
        const errorMessage = `Ошибка ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }
  
      const data = await response.json();
      console.log('Слово добавлено:', data);
  

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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="english"
          value={newWord.english}
          onChange={handleChange}
          placeholder="слово на англ.яз"
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
          placeholder="тег"
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Добавление...' : 'Добавить'}
        </button>
      </form>
    </div>
  );
};

export default NewWord;
