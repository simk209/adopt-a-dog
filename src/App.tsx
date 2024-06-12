import './App.css'
import Login from './components/Login'
import React, { useState } from 'react';
import axios from 'axios';
import Search from './components/Search';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = async (name: string, email: string) => {
    try {
      await axios.post('https://frontend-take-home-service.fetch.com/auth/login', { name, email }, { withCredentials: true });
      setAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      {authenticated ? <Search /> : <Login onLogin={handleLogin} />}
    </div>
  );
  
}

export default App
