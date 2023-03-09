import { BookCarousel } from "../components";
import { StyledHome } from "../styles";

const Home = () => {
  return (
    <>
    <StyledHome>
      {" "}
      <div className="bookCarousel">
      <h3 className="read">Recently Read:</h3>
      <BookCarousel />
      </div>
      </StyledHome>
    </>
  );
};

export default Home;

