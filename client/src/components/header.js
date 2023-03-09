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
          <h1 className="title">
           <Link to="/"> Paiges Pages.</Link>
          </h1>
          <button onClick={logout} className="button">Log Out</button>
          <div className="header-right">
          <div className='item'><Link to="/library">Library</Link></div>
            <div className='item'><Link to="/read">Read Now </Link></div>
          
          </div>
          
         
        </div>
     
      </StyledHeader>
      <Route path="/" exact component={Home} />
      <Route path="/library">
        <Library />
      </Route>
      <Route path="/read">
        <Read />
      </Route>
    </Router>
  );
};
export default Header;
