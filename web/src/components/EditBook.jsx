import React, {useState, useEffect} from 'react';

const EditBook = (props) => {

    // setting initial states
    const [book, setBook] = useState(props.currentBook);

    // effect hook to set setBook state to current selected book for editing
    useEffect(() => {
        setBook(props.currentBook)
    }, [props])

    // getting edit form inputs and setting them as states for setBook
    const handleInput = (e) => {
        const {name, value} = e.target;
        setBook({ ...book, [name]:value })
    }

    // handle edit form submission, update values in form
    const submitEditForm = (e) => {
        e.preventDefault();
        props.updateBook(book.id, book)
    }


    return(
        <form onSubmit={submitEditForm} className="text-light font-weight-bold">
            <div className="form-group">
            <label for="">Name</label>
            <input type="text" className="form-control" name="name" placeholder="Book name" value={book.name} onChange={handleInput}/>
            </div>
            <div className="form-group">
            <label for="">Author</label>
            <input type="text" className="form-control" name="author" placeholder="Author" value={book.author} onChange={handleInput} />
            </div>
            <div className="form-group">
            <label for="">Year Of Publication</label>
            <input type="text" className="form-control" name="year" placeholder="Year" value={book.year} onChange={handleInput} />
            </div>
            <div className="form-group">
            <label for="">Stock</label>
            <input type="text" className="form-control" name="stock" placeholder="Stock" value={book.stock} onChange={handleInput} />
            </div>
            <button className="btn btn-primary mr-4 mt-2">Submit</button>
            <button 
                type="submit" 
                className="btn btn-warning mt-2"
                style={{marginLeft: 8}}
                onClick={() => props.setEdit(false)}
            >
                Cancel
            </button>
        </form>
    )
}

export default EditBook;