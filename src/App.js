import React, { useState, useEffect, useMemo } from "react";
import { bookData } from "./data/books";

const BookList = () => {
  const [books, setBooks] = useState(bookData);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = useMemo(() => {
    let options = [];
    /* Instruction: Get all categories from books */
    bookData.forEach((book) => {
      // to make sure the genre wasn't already in the options
      book.categories.forEach((c) => {
        if (!options.includes(c)) {
          options.push(c);
        }
      });
    });
    return options;
  }, []);

  useEffect(() => {
    let newBooks = [...bookData];
    /* Instruction: filter books by selectedCategory */
    /* Instruction: set books to all books if selectedCategory is empty */
    if (selectedCategory !== "") {
      newBooks = newBooks.filter((b) =>
        b.categories.includes(selectedCategory)
      );
    }
    /* Instruction: set filtered books to books state */
    setBooks(newBooks);
  }, [bookData, selectedCategory]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <select onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        {/* instruction: list books using .map() */}
        {books.map((book) => (
          <div className="col-4 my-5" key={book.title}>
            <div className="card">
              <img
                src={"/images/" + book.image}
                alt={book.title}
                className="card-img-top"
              />
              <div className="card-body">
                <h2 className="card-title">{book.title}</h2>
                <p className="card-text">Author: {book.author}</p>
                {/* <p className="card-text">Category: {book.categories}</p> */}
                <span>
                  Category:
                  {book.categories.length > 0 &&
                    ` ${book.categories.join(", ")}`}
                </span>
                <p className="card-text">Year: {book.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
