/* Component for grid of books displayed on library page */

import { Link } from "react-router-dom"; //wraps each book item into a link to individual book page
import { StyledGrid } from "../styles";

//map through each book in list, extract and display data
const BooksGrid = ({ books }) => (
  <>
    {books ? (
      <StyledGrid>
        {books.map((book, i) => (
          <li className="grid__item" key={i}>
            <Link className="grid__item__inner" to={`/book/${book.id}`}>
              <div className="grid__item__img">
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                />
              </div>
            </Link>
          </li>
        ))}
      </StyledGrid>
    ) : (
      <p className="empty-notice">No Books available</p>
    )}
  </>
);

export default BooksGrid;
