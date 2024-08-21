import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import './App.css';
import MainPage from './components/MainPage';
import {BrowserRouter,Route,Routes} from 'react-router-dom';

function App() {
  const [numCards, setNumCards] = useState(20);



      

  return (
    <div className="App">
      <BrowserRouter basename="/memorygame_2">
        <Routes>
          <Route path="/"  element={<MainPage setNumCards={setNumCards}/>}></Route>
          <Route path="/game"  element={<GameBoard numCards={numCards}/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
