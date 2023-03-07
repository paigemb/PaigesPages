import { useState, useEffect } from 'react';
import { accessToken, logout, getCurrentUserBookshelves } from './googlebooks';
import { catchErrors } from './utils';
import './App.css';

import { Home } from "./pages"

function App() {
  //token variable for conditionally rendering the logged-in state
  const [token, setToken] = useState(null); //useState keeps track of token
  //const [bookshelves, setBookshelves] = useState(null);

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
          <div className="header">
              <a href="#default" className="logo">Paiges Pages</a>
              <div className="header-right">
                <a className="active" href="#home">Library</a>
                <a href="#contact">Stats</a>
                <a href="#about">Goals</a>
                <button onClick={logout}>Log Out</button>
              </div>
            </div>
            <div>
            
            </div>
          </>
        )}
      </header>
      <p>Here is where we are trying to render some data</p>
           <Home/>
    </div>
  );
}

export default App;
