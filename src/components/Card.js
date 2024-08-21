import React from 'react';
import './Card.css';

function Card({ card, onClick }) {
  return (
    <div className={`card ${card.flipped ? 'flipped' : ''}`} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front">
          {/* The front side of the card with a generic image */}
          <img 
            src={`${process.env.PUBLIC_URL}/images/generic.jpg`} 
            alt="Card Front" 
            className="card-image" 
          />
        </div>
        <div className="card-back">
          {/* The back side of the card with the specific image */}
          <img 
            src={`${process.env.PUBLIC_URL}/images/${card.image}.png`} 
            alt="Card Back" 
            className="card-image" 
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
