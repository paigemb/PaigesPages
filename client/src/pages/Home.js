/*Page that is displayed after initial log in */

import { BookCarousel } from "../components";
import { StyledHome } from "../styles";
import heart from "../music/heart.png"

const Home = () => {
  return (
    <>
      <StyledHome>
        {" "}
        <div className="bookCarousel">
          <h2 className="read">Recently Read:</h2>
          <BookCarousel />
        </div>
       
      </StyledHome>
    </>
  );
};

export default Home;