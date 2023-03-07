/* Component that maps over an array of artists and renders an item for each one in a list */
// note StyledGrid type to enable the circular framing

import { StyledGrid } from "../styles";

const BooksRow = ({ books }) => (
  <>
    {books && books.length ? (
      <StyledGrid>
        {books.map((book, i) => (
          <li className="grid__item" key={i}>
            <div className="grid__item__inner">
              {book.volumeInfo.imageLinks.thumbnail && (
                <div className="grid__item__img">
                  <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                </div>
              )}
              <h3 className="grid__item__name overflow-ellipsis">
                {book.volumeInfo.title}
              </h3>
              <p className="grid__item__label">Book</p>
            </div>
          </li>
        ))}
      </StyledGrid>
    ) : (
      <p className="empty-notice">No books available</p>
    )}
  </>
);

export default BooksRow;