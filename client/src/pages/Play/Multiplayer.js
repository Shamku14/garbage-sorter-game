import React, { useState, useEffect } from 'react';
import './Play.css';
import MultiWinModal from '../../components/MultiWinModal/MultiWinModal';

function Multiplayer() {
  const [draggedItem, setDraggedItem] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [winner, setWinner] = useState('');
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [isWin, setIsWin] = useState(false);
  const [imageVisibility, setImageVisibility] = useState({
    bananaPeel: false,
    paper: false,
    can: false,
    cheese: false,
    container: false,
    drinkCan: false,
    glassBottle: false,
    lettuce: false,
    plasticBag: true,
    plasticBottle: false,
    pizzaBox: false,
    potatoPeel: false,
    takeOutContainer: false,
  });
  const [imageVisibility2, setImageVisibility2] = useState({
    bananaPeel: true,
    paper: false,
    can: false,
    cheese: false,
    container: false,
    drinkCan: false,
    glassBottle: false,
    lettuce: false,
    plasticBag: false,
    plasticBottle: false,
    pizzaBox: false,
    potatoPeel: false,
    takeOutContainer: false,
  });
  
  useEffect(() => {
    const fetchAvatar = async () => {
      try{
          const response = await fetch('http://localhost:5000/get-avatar');
          if(!response.ok) {
            throw new Error('Failed to fetch avatar');
          }
          const data = await response.json();
          setAvatar(data.avatar)
        }
        catch (error) {
          console.error(error);
        }
    };
    fetchAvatar();
  }, []);

  
  const handleDragStart = (e, imageName) => {
    setDraggedItem(imageName);
  };

  const handleDropImage1 = (imageName, bin) => {
    handleDrop(imageName, bin, setImageVisibility, setScore1);
    console.log(imageName);
  };

  const handleDropImage2 = (imageName, bin) => {
    handleDrop(imageName, bin, setImageVisibility2, setScore2);
    console.log(imageName);
  };

  useEffect(() => {
    console.log("imageVisibility:", imageVisibility);
    console.log("imageVisibility2:", imageVisibility2);
    console.log("score1:", score1, "score2:", score2)
  
    if(score1 == 10){
      setIsWin(true);
      setWinner("Player 1");
    }
    else if (score2 == 10) {
      setIsWin(true);
      setWinner("Player 2");
    }
  }, [imageVisibility]);

  const handleDrop = (imageName, bin, setImageVisibilityFn, setScore) => {
    console.log("drop handling ");
      console.log(`${imageName} dropped into bin ${bin}`);
     
      // Perform waste check
      fetch('http://localhost:5000/waste-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imageName: imageName, binNum: bin })
      })
      .then(response => response.json())
      .then(data => {
        if (data && data.success) {
          setImageVisibilityFn(prevVisibility => ({
            ...prevVisibility,
            [imageName]: false
          }));
          // Set a random image visibility if the waste check was successful
          const images = Object.keys(imageVisibility);
          const randomIndex = Math.floor(Math.random() * images.length);
          const randomImage = images[randomIndex];
          setImageVisibilityFn(prevVisibility => ({
            ...prevVisibility,
            [randomImage]: true
          }));
          setScore(prevScore => prevScore + 1);
        } else {
          console.error('Error:', data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };
    
  // Listen for keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Get the pressed key
      const key = e.key;
  
      // Handle the drop based on the pressed key
      switch (key) {
        case '1':
          handleDropImage1(Object.keys(imageVisibility).find(key => imageVisibility[key]), 0);
          break;
        case '2':
          handleDropImage1(Object.keys(imageVisibility).find(key => imageVisibility[key]), 1);
          break;
        case '3':
          handleDropImage1(Object.keys(imageVisibility).find(key => imageVisibility[key]), 2);
          break;
        case 'ArrowLeft':
          handleDropImage2(Object.keys(imageVisibility2).find(key => imageVisibility2[key]), 0);
          break;
        case 'ArrowDown':
          handleDropImage2(Object.keys(imageVisibility2).find(key => imageVisibility2[key]), 1);
          break;
        case 'ArrowRight':
          handleDropImage2(Object.keys(imageVisibility2).find(key => imageVisibility2[key]), 2);
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [imageVisibility, imageVisibility2]);

  return (
    <div className="split-screen">
        <div className="left">
        <div className="gameplay">
            <div className="bin-bar-left">
            <div>
                <img src="bins/garbage.png" className="bin"></img>
                <img src="bins/recycling.png" className="bin"></img>
                <img src="bins/compost.png" className="bin"></img>
            </div>
              {avatar && <img src={`avatars/${avatar}.png`} className="wizard-left" alt="Avatar" />}
            </div>
        </div>
        {Object.entries(imageVisibility).map(([imageName, isVisible]) => (
            isVisible && (
            <img
                key={imageName} // Add a unique key for each image
                src={`waste/${imageName}.png`} // Use template literals to dynamically set the image source
                className="draggable"
                style={{
                  position: 'absolute',
                  top: '40%',
                  left: '23%',
                }}      
                onDragStart={(e) => handleDragStart(e, imageName)}
                alt={imageName}
            />
            )
        ))}
        <div class="score-container">
          <p>Player 1 - Score: { score1 }</p>
        </div>
        <div>
            <img src="portal.png" className="portal"/>
        </div>
        </div>
        <div className="right">
        <div className="gameplay">
            <div className="bin-bar-right">
            <div>
                <img src="bins/garbage.png" className="bin"></img>
                <img src="bins/recycling.png" className="bin"></img>
                <img src="bins/compost.png" className="bin"></img>
            </div>
            <img src="wizard.png" className="wizard"></img>
            </div>
        </div>
        {Object.entries(imageVisibility2).map(([imageName, isVisible]) => (
            isVisible && (
            <img
                key={imageName} // Add a unique key for each image
                src={`waste/${imageName}.png`} // Use template literals to dynamically set the image source
                className="draggable"
                style={{
                position: 'absolute',
                top: '40%',
                left: '73%',    
                }}      
                onDragStart={(e) => handleDragStart(e, imageName)}
                alt={imageName}
            />
            )
        ))}
        <div class="score-container">
          <p>Player 2 - Score: { score2 }</p>
        </div>
        </div>
        <MultiWinModal isOpen={isWin} onClose={'/Multiplayer'} winner={winner} />
    </div>
  );
}

export default Multiplayer;
