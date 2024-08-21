import React, { useState, useEffect } from 'react';
import Card from './Card';
import Timer from './Timer';
import { useNavigate } from 'react-router-dom';
import './GameBoard.css';
import axios from "axios";

function GameBoard({ numCards }) {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [time, setTime] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    initializeGame();
  }, [numCards]);

  useEffect(() => {
    if (isGameActive && matchedCards.length === cards.length) {
      setIsGameActive(false);
      handleGameEnd();
    }
  }, [matchedCards]);

  const initializeGame = () => {
    const cardImages = [...Array(numCards / 2)].map((_, i) => i);
    const shuffledCards = shuffle([...cardImages, ...cardImages].map((image, id) => ({ id, image, flipped: false })));
    setCards(shuffledCards);
    setMatchedCards([]);
    setSelectedCards([]);
    setIsGameActive(true);
    setTime(0); // Reset time when game initializes
  };

  const handleGameEnd = async () => {
    const playerName = prompt("You win! Enter your name:");
    if (playerName) {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/setScore`, { 
          name: playerName, 
          score: time,
          cards: numCards // Include the number of cards in the data
        }); 
        alert('Score submitted successfully!');
      } catch (error) {
        console.error("Error submitting score:", error);
        alert('Not valid api');
      }
    }
    navigate('/');
  };

  const getGridStyle = () => {
    if (numCards === 20) return { gridTemplateColumns: 'repeat(5, 1fr)' };
    if (numCards === 36) return { gridTemplateColumns: 'repeat(9, 1fr)' };
    if (numCards === 50) return { gridTemplateColumns: 'repeat(10, 1fr)' };
  };

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleCardClick = (card) => {
    if (selectedCards.length === 2 || matchedCards.includes(card.id) || card.flipped) return;

    const newCards = cards.map(c => c.id === card.id ? { ...c, flipped: true } : c);
    setCards(newCards);
    const newSelectedCards = [...selectedCards, card];

    if (newSelectedCards.length === 2) {
      if (newSelectedCards[0].image === newSelectedCards[1].image) {
        setMatchedCards([...matchedCards, newSelectedCards[0].id, newSelectedCards[1].id]);
        setSelectedCards([]);
      } else {
        setTimeout(() => {
          setCards(cards.map(c => 
            newSelectedCards.find(sc => sc.id === c.id) 
              ? { ...c, flipped: false } 
              : c
          ));
          setSelectedCards([]);
        }, 1000); // Flip cards back after 1 second
      }
    } else {
      setSelectedCards(newSelectedCards);
    }
  };

  return (
    <div class="container">
      <Timer isGameActive={isGameActive} setTime={setTime} className="timer" />
      <br/><br/><br/>
      <div className="game-board" style={getGridStyle()}>
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>
    </div>
  );
}

export default GameBoard;
