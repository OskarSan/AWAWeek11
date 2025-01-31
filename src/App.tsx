
import './App.css'
import FrontPage from './components/FrontPage';
import SavedPage from './components/SavedPage';
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom';
import {useJokes} from './hooks/useJokes';

function App() {
  const jokesHook = useJokes(); 
  console.log(jokesHook)
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<FrontPage saveJoke={jokesHook.saveJoke}/>} />
        <Route path="/saved" element={<SavedPage savedJokes={jokesHook.savedJokes}/>} />

      </Routes>
    </>
  )
}

export default App
