import React from 'react';

function LoseModal({ isOpen, onClose, onRedoLevel, onQuitGame }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Oh no, you lost!</h2>
        <button onClick={onRedoLevel}>Redo Level</button>
        <button onClick={onQuitGame}>Quit Game</button>
      </div>
    </div>
  );
}

export default LoseModal;
