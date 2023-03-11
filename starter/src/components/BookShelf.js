import React from "react";
import { Book } from "./Book";

export const BookShelf = ({ books, title, upDateShelf }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.length > 0 ? books.map((b) => (
            <li key={b.id}>
              <Book book={b} upDateShelf={upDateShelf} />
            </li>
          )) : <span> Your {title} Shelf Is Empty</span>}
        </ol>
      </div>
    </div>
  );
};
