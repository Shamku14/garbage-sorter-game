import React, { useState, useEffect } from 'react';
import './Menu.css';

function Menu() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('activeTab') || '/Play';
  });
  const [coins, setCoins] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInstructor, setIsInstructor] = useState(false);
  const [isDeveloper, setIsDeveloper] = useState(false);
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab); 
    window.location.href = tab;
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout');
      if (!response.ok) {
        throw new Error('Failed to logout');
      }
      setIsLoggedIn(false);
      console.log('Logout Success');
    } catch (error) {
      console.error('Logout Error:', error.message);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/logged');
        if (!response.ok) {
          throw new Error('Failed to check login status');
        }
        const data = await response.json();
        setIsLoggedIn(data.logged_in);

        const responseInstructor = await fetch('http://localhost:5000/get-instructor');
        if (!responseInstructor.ok) {
          throw new Error('Failed to check instructor status');
        }
        const dataInstructor = await responseInstructor.json();
        setIsInstructor(dataInstructor.instr);
  
        // Fetch user role as developer
        const responseDeveloper = await fetch('http://localhost:5000/get-developer');
        if (!responseDeveloper.ok) {
          throw new Error('Failed to check developer status');
        }
        const dataDeveloper = await responseDeveloper.json();
        setIsDeveloper(dataDeveloper.dev);

        const coinsResponse = await fetch('http://localhost:5000/get-coins');
        if (!coinsResponse.ok) {
          throw new Error('Failed to fetch coins');
        }
        const coinsData = await coinsResponse.json();
        setCoins(coinsData);

          } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
  
  return (
    <div className="tabs">
      <div className="coinbar">
        <div className="bar-item">
          <img className="bar-logo" src="logo192.png"/>
        </div>
        <div className={`tab ${activeTab === '/Play' ? 'active' : ''}`} onClick={() => handleTabClick('/Play')}>
          <a href="/Play">Play</a>
        </div>
        <div className={`tab ${activeTab === '/Multiplayer' ? 'active' : ''}`} onClick={() => handleTabClick('/Multiplayer')}>
          <a href="/Multiplayer">Multiplayer</a>
        </div>
        <div className={`tab ${activeTab === '/Shop' ? 'active' : ''}`} onClick={() => handleTabClick('/Shop')}>
          <a href="/Shop">Shop</a>
        </div>
        <div className={`tab ${activeTab === '/Leaderboard' ? 'active' : ''}`} onClick={() => handleTabClick('/Leaderboard')}>
          <a href="/Leaderboard">Leaderboard</a>
        </div>
        <div className={`tab ${activeTab === '/Tutorial' ? 'active' : ''}`} onClick={() => handleTabClick('/Tutorial')}>
          <a href="/Tutorial">Tutorial</a>
        </div>
        {isLoggedIn ? (
          <>
            {isDeveloper && (
              <div className={`tab ${activeTab === '/Debug' ? 'active' : ''}`} onClick={() => handleTabClick('/Debug')}>
                <a href="/Debug">Debug</a>
              </div>
            )}
            {isInstructor && (
              <div className={`tab ${activeTab === '/Instructor' ? 'active' : ''}`} onClick={() => handleTabClick('/Instructor')}>
                <a href="/Instructor">Instructor</a>
              </div>
            )}
            <div className="bar-item">
              <a href="/" onClick={handleLogout}>Logout</a>
            </div>
            <div className="bar-item">
              <img className="coin" src="coin.png" alt="Coins" />
              <p>{coins.coins}</p>
            </div>
          </>
          ) : (
            <div className={`tab ${activeTab === '/Login' ? 'active' : ''}`} onClick={() => handleTabClick('/Login')}>
              <a href="/Login">Login</a>
            </div>
          )}
      </div>
    </div>
  );
}

export default Menu;
