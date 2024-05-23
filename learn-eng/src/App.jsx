import './App.css'
import Navigation from './components/navigation/Navigation.jsx';
import WordList from './components/wordList/WordList.jsx';
import LoginForm from './components/navigation/loginform/LoginForm.jsx';
import RegisterForm from './components/navigation/registerform/RegisterForm.jsx';
import Main from './components/main/Main.jsx';
import NewWord from './components/newword/NewWord.jsx';
import Missing from './components/missingpage/Missing.jsx';
import { HashRouter as Router, Routes, Route } from'react-router-dom';
import { Provider } from "mobx-react";
import wordsStore from './stores/WordsStores.jsx';

const App = () => {
  return (
    <Provider store={wordsStore}>
    <Router>
      <div>
      <Navigation />
        <Routes>
          <Route path="/" element={ <WordList /> } />
          <Route path="/main" element={ <Main /> } />
          <Route path="/newword" element={ <NewWord /> } />
          <Route path="/registerform" element={ <RegisterForm /> } />
          <Route path="/loginform" element={ <LoginForm /> } />
          <Route path="*" element={ <Missing/> } />
        </Routes>
      </div>
    </Router>
  </Provider>
  );
};

export default App;