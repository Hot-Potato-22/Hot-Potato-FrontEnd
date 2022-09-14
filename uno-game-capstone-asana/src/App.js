import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login'
import SignUp from './pages/signup';
import Lobby from './pages/main';
import Game from './pages/unoGame.js';



function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/signup' element={<SignUp />}/>
        <Route exact path='/' element={<Login />}/> 
        <Route exact path='/home' element={<Lobby/>}/> 
        <Route  path='/play' exact element={<Game/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
