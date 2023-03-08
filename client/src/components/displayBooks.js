/* Component for grid of public playlists displayed on profile page */
//not no StyledGrid type specified, no circular framing

import { Link } from "react-router-dom"; //wraps each playlist item into a link to individual playlist page
import { StyledGrid } from "../styles";

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
