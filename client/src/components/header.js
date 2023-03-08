import { logout } from "../googlebooks";
import { StyledHeader, GlobalStyle } from "../styles";
import { SectionWrapper } from "./SectionWrapper";
import { Home, Library, Read } from "../pages";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const Header = () => {
  return (
    <Router>
     
      <StyledHeader>
     
        <div className="header">
          <h1 className="logo">
            <Link to="/"> Paige's Pages </Link>
          </h1>
          
          <div className="header-right">
            
          <Link to="/read">Read Now </Link>
            <Link to="/library">Library</Link>

          </div>
          
        </div>
        
      </StyledHeader>
      <button onClick={logout}>Log Out</button>
      <Route path="/" exact component={Home} />
      <Route path="/library">
        <Library />
      </Route>
      <Route path='/read'>
        <Read/>
      </Route>
    </Router>
  );
};
export default Header;
