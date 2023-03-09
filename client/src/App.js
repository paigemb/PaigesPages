import { useState, useEffect } from "react";
import { accessToken, logout } from "./googlebooks";
import "./App.css";

import { Login, BookInfo } from "./pages";
import { Header } from "./components";

// imports to handling page routing
import {
  BrowserRouter as Router,
  Switch, //switch will find the first element with matching path and ignore the rest -> list more specific routes first
  Route,
  useLocation,
} from "react-router-dom";

// Scroll to top of page when changing routes
// https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  //token variable for conditionally rendering the logged-in state
  const [token, setToken] = useState(null); //useState keeps track of token
  const [playlist, setPlaylist] = useState("");
  // store access token
  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <div className="App">
      {!token ? (
        <Login />
      ) : (
        <>
          <Header />
          <Router>
            <ScrollToTop />
            <Switch>
              <Route path="/book/:id">
                <BookInfo />
              </Route>
            </Switch>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;
