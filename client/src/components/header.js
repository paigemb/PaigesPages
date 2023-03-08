import { logout } from "../googlebooks";
import { StyledHeader } from "../styles";
import { SectionWrapper } from "./SectionWrapper";
import { Home, Library } from "../pages";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Header = () => {
  return (
    <Router>
      <StyledHeader>
        <div className="header">
          <p className="logo">
            <Link to="/"> Paige's Pages </Link>
          </p>
          <div className="header-right">
            <Link to="/library">Library</Link>
            <button onClick={logout}>Log Out</button>
          </div>
        </div>
      </StyledHeader>

      <Route path="/" exact component={Home} />
      <Route path="/library">
        <Library />
      </Route>
    </Router>
  );
};
export default Header;
