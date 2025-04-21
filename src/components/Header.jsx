import React from 'react';
import './index.css';

const Header = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Ticket<span className="plus">+</span>
        </h1>
        <p className="hero-subtitle">
          With over 3000 movies on <span className="highlight">Ticket+</span>, the possibilities are endless!
        </p>
        <button className="hero-button">Find a movie</button>
      </div>
    </div>
  );
};

export default Header;