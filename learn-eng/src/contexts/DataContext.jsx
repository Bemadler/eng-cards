// import React, { createContext, useState, useEffect, useContext } from "react";


// const WordContext = createContext({
//     words: [], //массив объектов с словами, транскрипцией, переводом
//     error: null,
//     isLoading: true,
//     addWord: () => {},
//     removeWord: () => {},
//     updateWord: () => {},
// });

// export const useWordContext = () => {
//     const { words, error, isLoading, addWord, removeWord, updateWord } = useContext(WordContext);
//     return { words, error, isLoading,  addWord, removeWord, updateWord  };
// };

// export const fetchWords = async () => {
//     try {
//         const response = await fetch("http://itgirlschool.justmakeit.ru/api/words");
//         if (!response.ok) {
//             throw new Error("Ошибка при загрузке слов");
//         }
//         const jsonData = await response.json();
//         return jsonData;
//     } catch (error){
//         console.error(error);
//         return [];
//     }
// }

// export const WordProvider = ({ children }) => {
//     const [words, setWords] = useState([]);
//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try{ 
//                 const fetchedWords = await fetchWords();
//                 setWords(fetchedWords);
//                 setIsLoading(false);
//             } catch (error){
//                 //обновить ошибку в контексте при возникновении ошибки
//                 setError(error.message);
//                 setIsLoading(false);
//                 console.error(error); //логирование ошибки для отладки
//             }
//         };
//         fetchData();
//     }, []); //один раз вызываем функцию [] в useEffect, в которой создаем функцию fetchData, которая будет вызываться при изменении состояния

//     const addWord = (newWord) => {
//         setWords([...words, newWord]);
//     };

//     const removeWord = (id) => {
//         const updatedWords = words.filter(word => word.id !== id);
//         setWords(updatedWords);
//     };
    
//     const updateWord = (id, updatedWord) => {
//             const updatedWords = words.map(word => {
//                 if (word.id === id) {
//                     return {...word,...updatedWord };
//                 }
//                 return word;
//             });
//             setWords(updatedWords);
//     }
//     return (
//         <WordContext.Provider value={{ words, error, isLoading, addWord, removeWord, updateWord }}>
//             {isLoading ? (
//         <div>Loading...</div>
//     ):(
//         children
            
//         )}        

//         </WordContext.Provider>
//     );
// };


