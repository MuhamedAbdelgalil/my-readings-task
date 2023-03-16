import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import { Book } from "../components/Book";
import { useDebounce } from "use-debounce";
import Spinner from "../shared/components/Spinner";

export const SearchPage = ({ books }) => {
  const searchInputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [value] = useDebounce(query, 500);
  const [sbooks, setSbooks] = useState([]);
  const [mapIdBooks, setMapIdBooks] = useState(new Map());
  const [comboBooks, setComboBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    BooksAPI.getAll().then((data) => {
      setMapIdBooks(createMapIdBooks(data));
    }).finally(() => {
      setIsLoading(false); searchInputRef.current.focus();
    });
    let isFoucse = true;
    if (value) {
      BooksAPI.search(value).then((data) => {
        if (data.error) {
          setSbooks([]);
          setIsLoading(false);
        } else {
          if (isFoucse) {
            setSbooks(data);
            setIsLoading(false);
          }
        }
      });
    }
    return () => {
      isFoucse = false;
      setSbooks([]);
    };
  }, [value]);

  useEffect(() => {
    const combo = sbooks.map((book) => {
      if (mapIdBooks.has(book.id)) {
        return mapIdBooks.get(book.id);
      } else {
        return book;
      }
    });
    setComboBooks(combo);
  }, [sbooks, mapIdBooks]);

  const createMapIdBooks = (books) => {
    const map = new Map();
    books.map((book) => map.set(book.id, book));
    return map;
  };

  const upDateShelf = (book, shelf) => {
    setIsLoading(true);
    const upDateBooks = sbooks.map((item) => {
      if (item.id === book.id) {
        book.shelf = shelf;
        return book;
      }
      return item;
    });
    setSbooks(upDateBooks);
    BooksAPI.update(book, shelf);
    setIsLoading(false);

  };

  return (
    <>
      {
        isLoading ?
          <Spinner /> :
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">
                Close
              </Link>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title, author, or ISBN"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  ref={searchInputRef}
                />
              </div>
            </div>
            <div className="search-books-results">
              {sbooks.length > 0 ? (
                <div>
                  <h3 style={{ textAlign: "center" }}>
                    Search returned {sbooks.length} books{" "}
                  </h3>
                  <ol className="books-grid">
                    {comboBooks.map((b) => (
                      <li key={b.id}>
                        <Book book={b} books={books} upDateShelf={upDateShelf} />
                      </li>
                    ))}
                  </ol>
                </div>
              ) : value && <p style={{textAlign: "center"}}> No Available Books Matched!</p>
              }
            </div>
          </div>
      }
    </>

  );
};
