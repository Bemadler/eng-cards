import { makeAutoObservable, runInAction } from "mobx";

class WordsStore {
  wordList = [];
  isLoading = true;
  error = null;
  editingWord = null;
  emptyInputs = [];

  constructor() {
    makeAutoObservable(this);
    this.fetchWordList();
  }

  addWord = async (newWord) => {
    try {
      const response = await fetch(
        "/api/words/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newWord),
        }
      );
      if (!response.ok) {
        throw new Error("Ошибка при добавлении слова");
      }
      const data = await response.json();
      runInAction(() => {
        this.wordList.push(data);
      });
    } catch (error) {
      console.error("Ошибка:", error);
      runInAction(() => {
        this.error = error;
      });
    }
  };

  async fetchWordList() {
    try {
      const response = await fetch(
        "http://itgirlschool.justmakeit.ru/api/words"
      );
      if (!response.ok) {
        throw new Error("Ошибка при загрузке списка слов");
      }
      const data = await response.json();
      runInAction(() => {
        this.wordList = data;
        this.isLoading = false;
      });
    } catch (error) {
      console.error("Ошибка", error);
      runInAction(() => {
        this.error = error;
        this.isLoading = false;
      });
    }
  }

  startEditing(word) {
    this.editingWord = word;
    this.checkEmptyInputs(word);
  }

  checkEmptyInputs(word) {
    const inputs = Object.keys(word);
    this.emptyInputs = inputs.filter((input) => word[input] === "");
  }

  handleInputChange(name, value) {
    this.editingWord = { ...this.editingWord, [name]: value };
    this.checkEmptyInputs(this.editingWord);
  }

  async saveWord(updatedWord) {
    try {
      const response = await fetch(
        `http://itgirlschool.justmakeit.ru/api/words/${updatedWord.id}/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedWord),
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при сохранении слова");
      }

      const data = await response.json();
      runInAction(() => {
        this.wordList = this.wordList.map((word) =>
          word.id === data.id ? data : word
        );
        this.editingWord = null;
      });
    } catch (error) {
      console.error("Ошибка обновления слова:", error);
    }
  }

  cancelEditing() {
    this.editingWord = null;
  }

  async deleteWord(wordId) {
    try {
      const response = await fetch(
        `http://itgirlschool.justmakeit.ru/api/words/${wordId}/delete`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при удалении слова");
      }

      runInAction(() => {
        this.wordList = this.wordList.filter((word) => word.id !== wordId);
      });
    } catch (error) {
      console.error("Ошибка при удалении слова:", error);
    }
  }
}

const wordStore = new WordsStore();
export default wordStore;
