import { useState, useEffect } from 'react';
import { accessToken, logout, getCurrentUserBookshelves } from './googlebooks';
import { StyledLogoutButton } from './styles';
import { catchErrors } from './utils';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

function App() {
  //token variable for conditionally rendering the logged-in state
  const [token, setToken] = useState(null); //useState keeps track of token
  const [bookshelves, setBookshelves] = useState(null);

  // store access token
  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
        const { data } = await getCurrentUserBookshelves();
        setBookshelves(data);
    };

    catchErrors(fetchData());
  }, []);
console.log("here are the" + bookshelves.title);
  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <a className="App-link" href="http://localhost:8888/login">
          Login
        </a>
        ): (
          <>
          <button onClick={logout}>Log Out</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
