import { createContext } from "react";

const WordsContext = createContext({
  words: [],
  fetchWords: () => {},
  addWord: () => {},
  updateWord: () => {},
  deleteWord: () => {},
});

export default WordsContext;