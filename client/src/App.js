import { useState, useEffect } from 'react';
import { accessToken, logout } from './googlebooks';
import './App.css';


function App() {
  //token variable for conditionally rendering the logged-in state
  const [token, setToken] = useState(null); //useState keeps track of token

  // store access token
  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <a className="App-link" href="http://localhost:8888/login">
          Login
        </a>
        ): (
          <>
          <h1>Logged in!</h1>
          <button onClick={logout}>Log Out</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
