
import './App.css'
import FrontPage from './components/FrontPage';
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<FrontPage/>} />
        <Route path="/saved" element={<div>Saved Page</div>} />
      </Routes>
    </>
  )
}

export default App
