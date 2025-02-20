import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const token = localStorage.getItem('token');

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Travel Journal</h1>
        <p>Share your travel experiences and memories</p>
        {!token && (
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary">Get Started</Link>
            <Link to="/login" className="btn btn-secondary">Login</Link>
          </div>
        )}
      </div>

      <div className="features">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Personal Journal</h3>
            <p>Keep track of all your travel memories in one place</p>
          </div>
          <div className="feature-card">
            <h3>Secure Storage</h3>
            <p>Your entries are safely stored and private</p>
          </div>
          <div className="feature-card">
            <h3>Easy to Use</h3>
            <p>Simple and intuitive interface for managing your entries</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 