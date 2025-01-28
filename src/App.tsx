
import './App.css'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/saved" element={<div>Saved Page</div>} />
      </Routes>
    </>
  )
}

export default App
