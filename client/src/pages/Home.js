import { BooksRow, CarouselPage, BookCarousel } from "../components";

const Home = () => {
  return (
    <>
      {" "}
      <h3>Currently Reading</h3>
      <BookCarousel />
    </>
  );
};

export default Home;
/**{books ? <CarouselPage books={arr}/> : <p>sorrryyyy</p>} */
