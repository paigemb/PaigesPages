import React, {useEffect, useState } from "react";
import { getCurrentReading } from "../googlebooks";
import axios from "axios";
import { catchErrors } from "../utils";

import { BooksGrid } from "../components"

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

  // when playlistsData updates, check if there are more playlists to fetch
  // then update the state variable
  useEffect(() => {
    if (!booksData) {
      return;
    }

    // playlist endpoint only returns 20 playlists at a time, so we need to
    // make sure we get ALL playlists by fetching the next set of playlists
    const fetchMoreData = async () => {
      // wrap fetch and set state logic in conditional to loop until last paging object
      if (booksData.next) {
        const { data } = await axios.get(booksData.next);
        setBooksData(data);
      }
    };

    //update playlists state variable w/functional update (reactjs.org/docs/hooks-reference.html#functional-updates)
    //merges previous playlist state variable array with the items array on the current playlistsData object
    //pass new playlists array into <PlaylistsGrid>
    setBooks((books) => [...(books ? books : []), ...booksData.items]);

    // Fetch next set of playlists as needed
    catchErrors(fetchMoreData());
  }, [booksData]);

  
  let seenTitles = {};
  let bookList = {};
  bookList = books.filter(function(book) {
    if (book.volumeInfo.title in seenTitles) {
        return false;
    }
    else {
        seenTitles[book.volumeInfo.title] = true;
        return true;
    }
  })
  console.log(bookList)
  
    return (
        <><h3>Current Library</h3><
            BooksGrid books={bookList} /></>
       
    )
};
export default Library;
