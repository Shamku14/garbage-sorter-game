import React from 'react';

function MultiWinModal({ isOpen, onClose, winner }) {
  if (!isOpen) return null;

  const handleClose = () => {
    window.location.href = '/multiplayer'; // Redirect to '/multiplayer' when modal is closed
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>End of Game!</h2>
        <p>Winner: {winner}</p>
        <button onClick={handleClose}>Play Again</button>
      </div>
    </div>
  );
}

export default MultiWinModal;
