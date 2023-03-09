/* Page to display an individual book */

import React, { useEffect, useState } from "react";
import { getBookById } from "../googlebooks";
import { catchErrors } from "../utils";
import { useParams } from "react-router-dom";
import { StyledBookInfo } from "../styles";
import { Timer, AudioPlayer } from "../components";

const BookInfo = () => {
  const { id } = useParams(); //fetch book id from url
  const [book, setBook] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getBookById(id);
      setBook(data);
    };
    catchErrors(fetchData());
  }, [id]);

  return (
    <>
      {book && book !== undefined ? ( 
        <>
          <br></br>
          <>
            <StyledBookInfo>
              <div className="bookInfo">
                <h2>{book.volumeInfo.title}</h2>
                <h3>By {book.volumeInfo.authors}</h3>
                <div class="flex-cont">
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                    className="cover"
                  />
                  <p className="description">
                    {book.volumeInfo?.description.replace(
                      /<\/?[^>]+(>|$)/g,
                      ""
                    )}
                  </p>
                </div>
                <p>{book.volumeInfo.pageCount} pages</p>
              </div>

              <div className="timer">
                {" "}
                <Timer book={book.volumeInfo.pageCount} />
              </div>
              <AudioPlayer />
            </StyledBookInfo>
          </>
        </>
      ) : (
        <p>There is NO book</p>
      )}
    </>
  );
};

export default BookInfo;
