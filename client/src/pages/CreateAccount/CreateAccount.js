import React, { useState } from 'react';
import './CreateAccount.css';

function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to login');
      }
      console.log('Login Success:', data);
      window.location.href = '/play';
      // Redirect or perform actions after successful login
    } catch (error) {
      console.error('Login Error:', error.message);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="App">
      <h1>Create an Account</h1>
      <div className="AccountInfo">
        <div className="AccountSpacing">
          <div className="AccountInput">
            <p>User ID: </p>
            <input type="text" id="InfoBox" value={username} onChange={handleUsernameChange} />
          </div>
          <div className="AccountInput">
            <p>Password:</p>
            <input type="text" id="InfoBox" value={password} onChange={handlePasswordChange} />
          </div>
        </div>
        <div className="ButtonBounds">
          <button className="WWButton" onClick={handleSignUp}>Become a Waste Wizard</button>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
