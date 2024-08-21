import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import './App.css';
import MainPage from './components/MainPage';
import {BrowserRouter,Route,Routes} from 'react-router-dom';

function App() {
  const [numCards, setNumCards] = useState(20);


  /*return (
    <div className="App">
      
      <h1>Memory Game</h1>
      <label>
        Number of Cards: 
        <select value={numCards} onChange={handleNumCardsChange}>
          <option value={20}>20</option>
          <option value={36}>36</option>
          <option value={50}>50</option>
        </select>
      </label>
      <GameBoard numCards={numCards} />
    </div>
  );*/
  return (
    <div className="App">
      <BrowserRouter basename="/memory_game_reactjs">
        <Routes>
          <Route path="/"  element={<MainPage setNumCards={setNumCards}/>}></Route>
          <Route path="/game"  element={<GameBoard numCards={numCards}/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
