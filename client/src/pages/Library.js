/*Page for displaying entire Currently Reading bookshelf */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCurrentReading } from "../googlebooks";
import { catchErrors } from "../utils";

//styling
import { BooksGrid } from "../components";

/*
 * Google Books API allows maximum of 40 returned results, handle just in case
 * Wrap JSON response in a paging object containing a next property containing the URL of the next page of items
 * ex API call returns = next: "https://api.spotify.com/v1/users/username/playlists?offest=10....etc"
 * need to do a second GET call to next's url
 * TODO: this is not needed, refactor
 */
const Library = () => {
  const [booksData, setBooksData] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentReading();
      setBooksData(data);
    };

    catchErrors(fetchData());
  }, []);

  // when bookssData updates, check if there are more books to fetch
  // then update the state variable
  useEffect(() => {
    if (!booksData) {
      return;
    }
    
    // make sure we get ALL books by fetching the next set of books
    const fetchMoreData = async () => {
      // wrap fetch and set state logic in conditional to loop until last paging object
      if (booksData.next) {
        const { data } = await axios.get(booksData.next);
        setBooksData(data);
      }
    };

    //update playlists state variable w/functional update (reactjs.org/docs/hooks-reference.html#functional-updates)
    //merges previous playlist state variable array with the items array on the current bookData object
    //pass new books array 
    setBooks((books) => [...(books ? books : []), ...booksData.items]);

    // Fetch next set of books as needed
    catchErrors(fetchMoreData());
  }, [booksData]);


  //our overcomplicated code causes duplicates, filter those out until we can refactor
  let seenTitles = {};
  let bookList = {};
  bookList = books.filter(function (book) {
    if (book.volumeInfo.title in seenTitles) {
      return false;
    } else {
      seenTitles[book.volumeInfo.title] = true;
      return true;
    }
  });

  //return the books in a grid format
  return (
    <>
      <h3>Current Library</h3>
      <BooksGrid books={bookList} />
    </>
  );
};
export default Library;
