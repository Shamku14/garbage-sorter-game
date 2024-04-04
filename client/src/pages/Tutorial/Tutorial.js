import React, { useState } from 'react';
import './Tutorial.css';

function Tutorial() {
  // State to manage the currently displayed image and text
  const [currentImage, setCurrentImage] = useState('WASTEWIZARDLOGO.png');
  const [displayText, setDisplayText] = useState('Select an option to see tutorial');

  // Function to change the displayed image and text
  const changeImage = (imagePath, text) => {
    setCurrentImage(imagePath);
    setDisplayText(text);
  };

  return (
    <div>
      <h1>HOW TO PLAY!</h1>
      <img src={currentImage} alt="Tutorial" height="360" />
      <p>{displayText}</p>
      <div>
        <button onClick={() => changeImage('Play.png', 'Welcome to the Play Mode! Here is where you will have a blast sorting and educating yourself on how to sort your garbage. You also have powerups were you can add lives try to get the most amount of points to then earn you more coins.')}>Play</button>
        <button onClick={() => changeImage('Multiplayer.png', 'Welcome to the Multiplayer mode of our game! In this mode, you can compete with other players to achieve the highest score. Player 1 will use the 1 2 3 keys, where Player 2 will us the left down right keys to move the garbage into the correct bin')}>Multiplayer</button>
        <button onClick={() => changeImage('Shop.png', 'Welcome to the Shop page! This is the place to get new and fresh avatars. These can be purchased using your coins that you earn fro being mroe accurate.')}>Shop</button>
      </div>
      <div>
        <button onClick={() => changeImage('Leaderboard.png', 'Welcome to the Leaderboard page! Here is where you will see the players with the best highcscores. To get your name on this list try and be the most accurate.')}>Leaderboard</button>
        <button onClick={() => changeImage('Debug.png', 'Welcome to the Debug Dashboard! Here is where Developers have specific access to skip through levels and fix any conflicts that may be happening with the game.')}>Debug</button>
        <button onClick={() => changeImage('Login.png', 'Welcome to the Login page! Here is where you can Login and then have access to get Avatars and earn coins. to save the state of your account, Click logout after your are done playing for the day.')}>Login</button>
      </div>
    </div>
  );
}

export default Tutorial;
