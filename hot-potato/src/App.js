import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login'
import SignUp from './pages/signup';
import CreateGame from './pages/createGame';
import JoinGame from './pages/joinGame';
import SocketTest from './components/SocketTest';
import Start from './pages/start';
import GameLobby from './components/GameLobby';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/socket' element={<SocketTest></SocketTest>}/>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/signup' element={<SignUp />}/>
        <Route exact path='/start' element={<Start />}/>
        <Route exact path='/create' element={<CreateGame />}/>
        <Route exact path='/join' element={<JoinGame />}/>
        <Route path="Hot-Potato/games/:id" element={<GameLobby />} />
      </Routes>
    </Router>
  );
}

export default App;
