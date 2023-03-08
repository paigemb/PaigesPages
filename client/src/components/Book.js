import { StyledBookInfo } from "../styles";

import { Timer } from "../components";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const Book = ({ book }) => {
  {
    book  ? (
      <>
        <StyledBookInfo>
          <h2>{book.volumeInfo.title}</h2>
          <h3>By {book.volumeInfo.authors}</h3>
          <div class="flex-cont">
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={book.volumeInfo.title}
              className="cover"
            />

            <p className="description">
              {book.volumeInfo.description.replace(/<\/?[^>]+(>|$)/g, "")}
            </p>
          </div>
          <p>{book.volumeInfo.pageCount} pages</p>
        </StyledBookInfo>
        <Popup trigger={<button>Read Now!</button>} position="right center">
          <Timer />
        </Popup>
      </>
    ) : (
      <p>No book found</p>
    );
  }
};

export default Book;
