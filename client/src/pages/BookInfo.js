/* Page to display an individual book */

import React, {useEffect, useState } from "react";
import axios from "axios";
import { getBookById } from "../googlebooks";
import { catchErrors } from "../utils";
import { useParams } from "react-router-dom";

const BookInfo = () => {
    const {id} = useParams();
    const [book, setBook] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await getBookById(id);
            setBook(data);
        };
        catchErrors(fetchData());
    }, [id]) //id is a dependency, don't need to run it until we know what the id is


    return (
      <>
      {book ? (
        <><><h2>{book.volumeInfo.title}</h2>
                    <h3>By {book.volumeInfo.authors}</h3>
                    <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                    <p>{book.volumeInfo.pageCount} pages</p>
                    <p>{(book.volumeInfo.description).replace(/(&lt;([^>]+)>)/gi, "")}</p></><button>Read Now!</button></>
        
      ) : (
        <p>There is NO book</p>
      ) }
      </>
    )

}

export default BookInfo