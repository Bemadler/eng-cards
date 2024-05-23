import React, { createContext } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import wordStore from '../WordsStores';

export const WordContext = createContext(wordStore);

export const WordProvider = ({ children }) => {
  const store = useLocalObservable(() => wordStore);

  return (
    <WordContext.Provider value={store}>
      {children}
    </WordContext.Provider>
  );
};
