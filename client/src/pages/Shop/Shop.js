import React, { useState, useEffect } from 'react';
import "./Shop.css";

function Shop() {
  const [avatars, setAvatars] = useState([]);
  const [avatarPrices, setAvatarPrices] = useState([]);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await fetch('http://localhost:5000/show-purchased');
        if (!response.ok) {
          throw new Error('Failed to fetch avatars');
        }
        const data = await response.json();
        console.log("Owned: ", data.inventory);
        setAvatars(data.inventory);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAvatars();
  }, []);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('http://localhost:5000/avatar-shop');
        if (!response.ok) {
          throw new Error('Failed to fetch avatar prices');
        }
        const data = await response.json();
        console.log("Avatar prices:", data);
        setAvatarPrices(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrices();
  }, []);

  const handlePurchase = async (avatarID) => {
    try {
      const response = await fetch('http://localhost:5000/purchase-avatar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ avatarID })
      });

      if (!response.ok) {
        throw new Error('Failed to purchase avatar');
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleEquip = async (avatarID) => {
    try {
      const response = await fetch('http://localhost:5000/equip-avatar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ avatarID })
      });

      if (!response.ok) {
        throw new Error('Failed to purchase avatar');
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="Heading">
        <h1>Shop</h1> 
      </div>
      <div className="ShopOptions">
        {avatarPrices.map((avatar, index) => (
          <div className={`avatar-box-${index % 2 === 0 ? '1' : '2'}`} key={avatar.avatarID}>
            <div className="info-bar">
              <h3>{avatar.name}</h3>
              <img className="Avatar-option-img" src={`avatars/${avatar.avatarID}.png`} alt={`Avatar${index}`} />
            </div>
            <div>
              {avatars && avatars.map(avatar => parseInt(avatar)).includes(avatar.avatarID) ? (
                <div className="itemInfo">
                  <p>Owned</p>
                  <button className="WWButton" onClick={() => handleEquip(avatar.avatarID)}>Equip</button>
                </div>
              ) : (
                <div className="itemInfo">
                  <button className="WWButton" onClick={() => handlePurchase(avatar.avatarID)}>Buy</button>
                  <div className="Price"><p>Price: ${avatar.cost}</p></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
