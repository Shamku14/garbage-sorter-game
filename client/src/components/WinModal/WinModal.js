
import React from 'react';

function WinModal({ isOpen, onClose, score, coinsEarned }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Congratulations, you won!</h2>
        <p>Score: {score}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default WinModal;
