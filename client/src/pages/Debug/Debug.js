import React from 'react';
import './Debug.css';

function Debug() {
  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleLevelButton = async (level) => {
    try {
      const response = await fetch('http://localhost:5000/set-level', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ level_set: level })
      });
      
      if (!response.ok) {
        throw new Error('Failed to set level');
      } else {
        window.location.href = `/Play`;
      }
      
      console.log(`Level ${level} set successfully`);
    } catch (error) {
      console.error('Error setting level:', error.message);
    }
  };

  return (
    <div className="App">
      <h1>Debug: Level Selection</h1>
      <div className="DebugInfo">
        <div className="DebugSpacing">
          <div className="DebugLevelBox">
            <div className="LevelDisplay">
              {levels.map((level) => (
                <button
                  key={level}
                  className="DebugButton" 
                  onClick={() => handleLevelButton(level)}
                >
                  Level {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Debug;

