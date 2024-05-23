import Footer from '../../components/footer/Footer.jsx';
import styles from './WordList.module.css';
import { observer } from 'mobx-react-lite';
import WordsStores from '../../stores/WordsStores.jsx';

const WordList = observer(() => {
  const wordStore = WordsStores;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    wordStore.handleInputChange(name, value);
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
          {wordStore.wordList.map((word) => (
            <tr key={word.id}>
              {wordStore.editingWord && wordStore.editingWord.id === word.id ? (
                <>
                  <td className={wordStore.emptyInputs.includes('english') ? styles.emptyInput : ''}>
                    <input
                      type="text"
                      value={wordStore.editingWord.english}
                      name="english"
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className={wordStore.emptyInputs.includes('transcription') ? styles.emptyInput : ''}>
                    <input
                      type="text"
                      value={wordStore.editingWord.transcription}
                      name="transcription"
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className={wordStore.emptyInputs.includes('russian') ? styles.emptyInput : ''}>
                    <input
                      type="text"
                      value={wordStore.editingWord.russian}
                      name="russian"
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className={wordStore.emptyInputs.includes('tags') ? styles.emptyInput : ''}>
                    <input
                      type="text"
                      value={wordStore.editingWord.tags}
                      name="tags"
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <button onClick={() => wordStore.saveWord(wordStore.editingWord)} disabled={wordStore.emptyInputs.length > 0}>
                      Сохранить
                    </button>
                    <button onClick={wordStore.cancelEditing}>Отменить</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{word.english}</td>
                  <td>{word.transcription}</td>
                  <td>{word.russian}</td>
                  <td>{word.tags}</td>
                  <td>
                    <button onClick={() => wordStore.startEditing(word)}>Редактировать</button>
                    <button onClick={() => wordStore.deleteWord(word.id)}>Удалить</button>
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
});

export default WordList;
