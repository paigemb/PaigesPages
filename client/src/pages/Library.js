/*Page for displaying entire Currently Reading bookshelf */

import React, { useEffect, useState } from "react";

import { getCurrentReading, bookSearch } from "../googlebooks";
import { catchErrors } from "../utils";

//styling
import { BooksGrid } from "../components";

const Library = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentReading();
      setBooks(data.items) //get books out of []

    };

    catchErrors(fetchData());
  }, []);


  //return the books in a grid forma
  return (
    <>
      <BooksGrid books={books} />
    </>
  );
};
export default Library;
