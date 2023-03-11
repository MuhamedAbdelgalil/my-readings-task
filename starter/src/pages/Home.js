import React, { useState, useEffect } from "react";
import { BookShelf } from "../components/BookShelf";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Spinner from "../shared/components/Spinner";

export const Home = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBooks(books);
      setIsLoading(false);

    });
  }, []);

  const upDateShelf = (book, shelf) => {
    setIsLoading(true);

    BooksAPI.update(book, shelf).then(res => {
      console.log("success  ", res)
      const upDateBooks = books.map((e) => {
        if (e.id === book.id) {
          book.shelf = shelf;
          return book;
        }
        return e;
      });
      setBooks(upDateBooks);
      setIsLoading(false);
    }).catch(err =>{
      console.log(err)
      setIsLoading(false);

    });
  };

  const currentlyReading = books.filter((book) => book.shelf === "currentlyReading");
  const wantToRead = books.filter((book) => book.shelf === "wantToRead");
  const read = books.filter((book) => book.shelf === "read");

  return (
    <>
      {isLoading ? <Spinner /> : <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              title="Currently Reading"
              books={currentlyReading}
              upDateShelf={upDateShelf}
            />
            <BookShelf
              title="Want To Read"
              books={wantToRead}
              upDateShelf={upDateShelf}
            />
            <BookShelf title="All Books" books={read} upDateShelf={upDateShelf} />
          </div>
        </div>
        <Link to="/search" className="open-search">
          Add a book
        </Link>
      </div>}
    </>
  )
};
