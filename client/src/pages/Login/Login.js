import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
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

  return (
    <div className="App">
      <h1>Login</h1>
      <div className="TestInfo">
        <div className="LoginSpacing">
          <div className="LoginInput">
            <p>User ID: </p>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="LoginInput">
            <p>Password:</p>
            <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <div className="ButtonBounds">
          <button className="LoginButton" onClick={handleLogin}>Login</button>
        </div>
        <div className="LoginPadding">
          <a href="http://localhost:3000/CreateAccount">Don't have an account?</a>
        </div>
      </div>
      <img src="TrashBag.png" className="TrashBag" alt="Trash Bag" />
    </div>
  );
}

export default Login;
