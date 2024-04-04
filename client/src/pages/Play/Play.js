import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import the useLocation hook
import './Play.css';
import Modal from '../../components/Modal/Modal';
import WinModal from '../../components/WinModal/WinModal';
import LoseModal from '../../components/LoseModal/LoseModal';

function Play() {
  const [draggedItem, setDraggedItem] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [strikes, setStrikes] = useState(3);
  const [fact, setFact] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [imageVisibility, setImageVisibilityState] = useState({
    bananaPeel:true,
    paper: true,
    can: true,
    cheese: true,
    container: true,
    drinkCan: true,
    glassBottle: true,
    lettuce: true,
    plasticBag: true,
    plasticBottle: true,
    pizzaBox: true,
    potatoPeel: true,
    takeOutContainer: true,
  });  
  const [showWand, setShowWand] = useState(false);

  const minTop = window.innerHeight * 0.20; // Minimum top position (25% from the top)
  const maxTop = window.innerHeight * 0.65; // Maximum top position (75% from the top)
  const minLeft = window.innerWidth * 0.30; // Minimum left position (25% from the left)
  const maxLeft = window.innerWidth * 0.70; // Maximum left position (75% from the left)

  const location = useLocation(); // Initialize useLocation hook

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


  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-score');
        if (!response.ok) {
          throw new Error('Failed to fetch score');
        }
        const data = await response.json();
        setScore(data.score);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchLevel = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-level');
        if (!response.ok) {
          throw new Error('Failed to fetch level');
        }
        const data = await response.json();
        setLevel(data.level);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchScore();
    fetchLevel();
    setInitialImagePositions();
  }, []); 

  useEffect(() => {
    if(isWin){
      setLevel(prevLevel => prevLevel + 1);
      setIsWin(true);
    }


  }, [isWin]);

  const setInitialImagePositions = () => {
    const initialImageVisibility = {};
    
    for (const key in imageVisibility){
      initialImageVisibility[key] = {
        isVisible: true,
        top: Math.random() * (maxTop - minTop) + minTop,
        left: Math.random() * (maxLeft - minLeft) + minLeft,
      };
    }
    setImageVisibilityState(initialImageVisibility);
  };  


  const decrementStrikes = () => {
    setStrikes(prevStrikes => prevStrikes - 1);
  };  
  const incrementStrikes = () => {
    if (strikes <= 4) {
      setStrikes(prevStrikes => prevStrikes + 1);
    }
  };  

  useEffect(() => {
    const fetchFact = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-fact');
        if (!response.ok) {
          throw new Error('Failed to fetch fact');
        }
        const data = await response.text();
        setFact(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFact();
    const interval = setInterval(() => {
      fetchFact();
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const handleDragStart = (e, imageName) => {
    setDraggedItem(imageName);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleResumeButton = () => {
    setIsPaused(false);
  };

  const handlePauseButton = () => {
    setIsPaused(true);
  };

  const handleQuitGame = () => {
    console.log("Quitting game ...");
    window.location.href = '/';
  }

  const handleRedoLevel = () => {
    window.location.href = '/Play';
  }

  useEffect(() => {
    const garbageLeft = Object.values(imageVisibility).some(isVisible => isVisible);
    if(!garbageLeft){
      setIsGameOver(true);
      setIsWin(true);
      setIsPaused(true);
    }
    if(strikes === 0){
      setIsGameOver(true);
      setIsPaused(true);
    }
  }, [strikes, imageVisibility]);

const handleDrop = (e, imageName) => {
  console.log("drop handling");
  e.preventDefault();

  // Get the coordinates of the drop event
  const dropX = e.clientX;
  const dropY = e.clientY;

  // Get all bin elements
  const binElements = document.querySelectorAll('.bin');

  // Iterate through each bin element
  binElements.forEach((binElement, index) => {
    // Get the bounding box of the bin element
    const binRect = binElement.getBoundingClientRect();

    // Check if the drop occurred within the bounds of the current bin
    if (
      dropX >= binRect.left &&
      dropX <= binRect.right &&
      dropY >= binRect.top &&
      dropY <= binRect.bottom
    ) {
      // If the drop occurred within the current bin, log a message
      console.log(`${imageName} dropped into bin ${index}`);
      fetch('http://localhost:5000/waste-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imageName: imageName, binNum: index })
      })
      .then(response => response.json())
      .then(data => {
        // If fetch returns true, update the score
        if (data && data.success) {
          console.log("correct bin");
          // Update score after successful drop
          if (Math.random() < 0.2) {
            setShowWand(true)
          }
          fetch('http://localhost:5000/update-score', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' // Specify the content type as JSON
            },
            body: JSON.stringify({ score_update: 5 })
          })
          .then(response => response.json())
          .then(data => {
            if (data) {
              // Update score state variable
              setScore(data.score);
              console.log("update score");
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });

          setImageVisibilityState(prevState => ({
            ...prevState,
            [imageName]: { ...prevState[imageName], isVisible: false }
          }));

        } else {
          console.log("wrong bin");
          if (Math.random() < 0.2) {
            setShowWand(true)
          }
          fetch('http://localhost:5000/update-score', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' // Specify the content type as JSON
            },
            body: JSON.stringify({ score_update: -3 })
          })
          .then(response => response.json())
          .then(data => {
            if (data) {
              // Update score state variable
              decrementStrikes();
              setScore(data.score);
              console.log("update score");
            }
          })
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  });
};

  return (
    <div className="main">
      <div className="header">
        <img src="pause.png" className="header-pause" onClick={handlePauseButton} alt="Pause Button" />     
        <div class="score-container">
          <p>Score: { score }</p>
          <p>Level: { level }</p>
        </div>
      </div>
      <div className="gameplay">
        <div class="bin-bar">
          <div class="wand-bar">
          {Array.from({ length: strikes }).map((_, index) => (
            <img key={index} src="wand.png" className="wand" alt="Wand"></img>
          ))}
          </div>
          <div>
            <img src="bins/garbage.png" class="bin"></img>
            <img src="bins/recycling.png" class="bin"></img>
            <img src="bins/compost.png" class="bin"></img>
          </div>
        </div>
      </div>
      {Object.entries(imageVisibility).map(([imageName, { isVisible, top, left}]) => (
        isVisible && (
          <img
            key={imageName} // Add a unique key for each image
            src={`waste/${imageName}.png`} // Use template literals to dynamically set the image source
            className="draggable"
            style={{
              position: 'absolute',
              top: `${top}px`,
              left: `${left}px`,
            }}      
            onDragStart={(e) => handleDragStart(e, imageName)}
            onDragEnd={(e) => handleDrop(e, imageName)}
            onDragOver={handleDragOver}
            alt={imageName}
          />
        )
      ))}
      <img onClick={incrementStrikes}
        style={{
          position: 'absolute',
          top: `${Math.random() * (maxTop - minTop) + minTop}px`, // Generate random top position 
          left: `${Math.random() * (maxLeft - minLeft) + minLeft}px`, // Generate random left position
        }}      
        src="powerup.png" class="draggable"/>
      <div class="facts-container">
        <p class="facts">{fact}</p>
      </div>
      <div>
        {avatar && <img src={`avatars/${avatar}.png`} className="wizard" alt="Avatar" />}
      </div>
      <div>
        <img src="portal.png" className="portal"/>
      </div>
      <Modal isOpen={isPaused} onClose={handleResumeButton} onQuit={handleQuitGame} />
      <WinModal isOpen={isGameOver && isWin} onClose={handleResumeButton} score={score} /> 
      <LoseModal isOpen={isGameOver && !isWin} onClose={handleResumeButton} onRedoLevel={handleRedoLevel} onQuitGame={handleQuitGame} />
    </div>
  );
}

export default Play;