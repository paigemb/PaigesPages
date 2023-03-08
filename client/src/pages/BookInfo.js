/* Page to display an individual book */
import React, { useEffect, useState } from "react";
import { getBookById } from "../googlebooks";
import { catchErrors } from "../utils";
import { useParams } from "react-router-dom";
import { Book } from "../components";

const BookInfo = () => {
  const { id } = useParams();
  const [book, setBook] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getBookById(id);
      setBook(data);
    };
    catchErrors(fetchData());
  }, [id]); //id is a dependency, don't need to run it until we know what the id is

  return (
    <>
      {book !== undefined ? (
        <><p>Keep Reading</p><Book book={book} /></>
      ) : (
        <p>There is NO book</p>
      )}
    </>
  );
};

export default BookInfo;
