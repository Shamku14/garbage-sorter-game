import React from 'react';
import './Modal.css';


function Modal({ isOpen, onClose, onQuit }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Game Paused</h2>
        <p>Do you want to quit the game?</p>
        <div className="buttons">
          <button onClick={onClose}>Resume</button>
          <button onClick={onQuit}>Quit</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;