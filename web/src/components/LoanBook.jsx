import React, { useState } from 'react';

const LoanBook = ({ books, onLoan }) => {
  const [selectedBookId, setSelectedBookId] = useState('');
  const [userData, setUserData] = useState({ username: '', loanDate: '', returnDate: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleLoanSubmit = event => {
    event.preventDefault();

    // Validar si se seleccionó un libro
    if (!selectedBookId) {
      setErrorMessage('Por favor selecciona un libro.');
      return;
    }

    const selectedBook = books.find(book => book.id === parseInt(selectedBookId));

    // Validar si hay suficiente stock para el préstamo
    if (selectedBook.stock <= 0) {
      setErrorMessage('¡Lo siento! Este libro no está disponible para préstamo.');
      return;
    }

    // Validar campos requeridos
    if (!userData.username || !userData.loanDate || !userData.returnDate) {
      setErrorMessage('Todos los campos son obligatorios.');
      return;
    }

    // Realizar acción de préstamo
    onLoan(selectedBook, userData);
    setUserData({ username: '', loanDate: '', returnDate: '' }); // Limpiar el formulario después del préstamo
    setSelectedBookId(''); // Limpiar la selección del libro
    setErrorMessage(''); // Limpiar mensaje de error
  };

  return (
    <div className="loan-book">
      <h2>Prestamo de Libro</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleLoanSubmit}>
        <div className="form-group">
          <label htmlFor="bookSelect">Selecciona un Libro:</label>
          <select
            className="form-control"
            id="bookSelect"
            onChange={e => setSelectedBookId(e.target.value)}
            value={selectedBookId}
            required
          >
            <option value="">Selecciona un libro...</option>
            {books.map(book => (
              <option key={book.id} value={book.id}>{book.name}</option>
            ))}
          </select>
        </div>
        {selectedBookId && (
          <>
            <div className="form-group">
              <label htmlFor="username">Nombre de Usuario:</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="loanDate">Fecha de Préstamo:</label>
              <input
                type="date"
                className="form-control"
                id="loanDate"
                name="loanDate"
                value={userData.loanDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="returnDate">Fecha de Devolución:</label>
              <input
                type="date"
                className="form-control"
                id="returnDate"
                name="returnDate"
                value={userData.returnDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Realizar Préstamo
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default LoanBook;