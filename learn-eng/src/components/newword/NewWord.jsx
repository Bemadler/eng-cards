
import React, { useContext, useState } from 'react';
import styles from './NewWord.module.css';
import { observer } from 'mobx-react-lite';
import { WordContext } from '../../stores/contexts/WordContext';
import LoadingPage from '../loadingpage/LoadingPage.jsx';
import Heart from "react-heart"
import Footer from '../../components/footer/Footer.jsx';

const NewWord = observer(() => {
  const wordStore = useContext(WordContext);
  const [active, setActive] = useState(false);
  const [newWord, setNewWord] = useState({
    english: "",
    transcription: "",
    russian: "",
    tags: "",
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
    setLoading(true);
    try {
      wordStore.addWord(newWord);
      setNewWord({
        english: "",
        transcription: "",
        russian: "",
        tags: "",
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
      <form onSubmit={handleSubmit}>
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
          {loading ? 'Добавление...' : 'Добавить'}
        </button>
        {loading && <LoadingPage />}
      </form>
      <div style={{ width: "2rem" }}>
			<Heart isActive={active} onClick={() => setActive(!active)} animationTrigger = "both" inactiveColor = "rgba(255,125,125,.75)" activeColor = "#e019ae" style = {{marginTop:'1rem'}} animationDuration = {0.1}/>
		</div>
    <Footer />
    </div>

  );
});

export default NewWord;
