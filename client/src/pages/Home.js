import { useState, useEffect } from "react";
import axios from "axios";
import { catchErrors } from "../utils";
import { getCurrentUserBookshelves, getCurrentReading } from "../googlebooks";
import { BooksRow, CarouselPage, BookCarousel } from "../components";


const Home = () => {
    //const [bookshelf, setBookshelves] = useState([])
    const [booksData, setBooksData] = useState(null);
    const [books, setBooks] = useState([])

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
        setBooks((books) => [
          ...(books ? books : []),
          ...booksData.items,
        ]);
    
        // Fetch next set of playlists as needed
        catchErrors(fetchMoreData());
      }, [booksData]);
   /* useEffect(() => {
        const fetchData = async () => {
            const { data } = await getCurrentReading();
            setBooksData(data);
        };

        catchErrors(fedtchData());

        setBooks()
      /*  const fetchData = async () => {
            const shelf = await getCurrentUserBookshelves();
            setBookshelves(shelf.data)

            const currentBooks = await getCurrentReading(); 
            setBooks(currentBooks.data);
        };
        catchErrors(fetchData());
    }, []);*/
//console.log(books.items[0].volumeInfo)
let arr = [];
    for (let i = 0; i < books.length + 1; i++) {
        if (books[i] && books[i] != undefined) {
            arr.push(books[i].volumeInfo.imageLinks.thumbnail);
        }
    }

    return (
        <> <h3>Currently Reading</h3>
 
        {books ? <BookCarousel/> : <p>sorrryyyy</p>}
        </>
    )
}

export default Home
/**{books ? <CarouselPage books={arr}/> : <p>sorrryyyy</p>} */