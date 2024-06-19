import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Books from './components/Books';
import Addbook from './components/AddBook';
import EditBook from './components/EditBook';
import LoanBook from './components/LoanBook'; // Importa el componente LoanBook

function App() {
  const bookData = [
    { id: 1, name: 'Book 1', author: 'Author1', year: '1989', stock: 5 },
    { id: 2, name: 'Book 2', author: 'Author 2', year: '2000', stock: 0 },
    { id: 3, name: 'Book 3', author: 'Author 3', year: '2020', stock: 2 }
  ];
  const formState = { id: null, name: '', author: '', year: '', stock: 0 };
  const [books, setBooks] = useState(bookData);
  const [edit, setEdit] = useState(false);
  const [currentBook, setCurrentBook] = useState(formState);

  const addBook = book => {
    book.id = books.length + 1;
    setBooks([...books, book]);
  };

  const editBook = book => {
    setEdit(true);
    setCurrentBook({ id: book.id, name: book.name, author: book.author, year: book.year, stock: book.stock });
  };

  const updateBook = (id, updatedBook) => {
    setEdit(false);
    setBooks(books.map(book => (book.id === id ? updatedBook : book)));
  };

  const deleteBook = id => {
    setEdit(false);
    setBooks(books.filter(book => book.id !== id));
  };

  const loanBook = (selectedBook, userData) => {
    const updatedBooks = books.map(book =>
      book.id === selectedBook.id ? { ...book, stock: book.stock - 1 } : book
    );
    setBooks(updatedBooks);
    // Aquí podrías manejar la lógica para almacenar los datos del préstamo, por ejemplo, en un estado o enviar a un servidor.
    console.log('Libro prestado:', selectedBook.name, 'por:', userData.username);
  };

  return (
    <div className="">
      <div className="header">
        <h1>LIBRARY APP WITH REACT JS</h1>
        <br />
        <br />
      </div>
      <div className="row library">
        <div className="col-sm-6 add-book">
          {edit ? (
            <div>
              <h2>Edit Book</h2>
              <EditBook edit={edit} setEdit={setEdit} currentBook={currentBook} updateBook={updateBook} />
            </div>
          ) : (
            <div>
              <h1>Add A Book</h1>
              <Addbook addBook={addBook} />
            </div>
          )}
        </div>
        <div className="col-md-6">
          <h1>Available Books</h1>
          <Books books={books} editBook={editBook} deleteBook={deleteBook} />
        </div>
        <div className="col-md-6">
          <LoanBook books={books} onLoan={loanBook} />
        </div>
      </div>
    </div>
  );
}

export default App;