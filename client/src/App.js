import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Play from './pages/Play/Play';
import Multiplayer from './pages/Play/Multiplayer';
import Default from './pages/Default';
import Debug from './pages/Debug/Debug';
import Login from './pages/Login/Login';
import Shop from './pages/Shop/Shop';
import Instructor from './pages/Instructor/Instructor';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import Tutorial from './pages/Tutorial/Tutorial';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import Menu from './components/Menu/Menu';

function App() {
  return (
    <div className="App">
      <Menu />
      <Router>
        <div className="content">
          <Routes>
            <Route exact path="*" element={<Default />} />
            <Route exact path="/" element={<Default />} />
            <Route exact path="/Play" element={<Play />} />
            <Route exact path="/Multiplayer" element={<Multiplayer />} />
            <Route exact path="/Debug" element={<Debug />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Shop" element={<Shop />} />
            <Route exact path="/Instructor" element={<Instructor />} />
            <Route exact path="/Leaderboard" element={<Leaderboard />} />
            <Route exact path="/Tutorial" element={<Tutorial />} />
            <Route exact path="/CreateAccount" element={<CreateAccount />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;