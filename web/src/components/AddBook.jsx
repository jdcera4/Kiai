import React, {useState} from 'react';

const Addbook = (props) => {

    // setting inital states for Component
    const formState = {
         id:null, 
         name:'', 
         author:'', 
         year:''
        }
    const [book, setBook] = useState(formState);

    // getting form inputs and setting them as states
    const handleInput = (e) => {
        const {name, value} = e.target;
        setBook({ ...book, [name]:value })
    }

    // handle book form on submission
    const submitBook = (e) => {
        e.preventDefault();
        if(!book.name || !book.author || !book.year) return
        props.addBook(book)
        setBook(formState)
    }

    return(
        <form onSubmit={submitBook} className="text-light font-weight-bold">
            <div class="form-group">
            <label for="">Name</label>
            <input type="text" class="form-control" name="name" placeholder="Book name" value={book.name} onChange={handleInput}/>
            </div>
            <div class="form-group">
            <label for="">Author</label>
            <input type="text" class="form-control" name="author" placeholder="Author" value={book.author} onChange={handleInput} />
            </div>
            <div class="form-group">
            <label for="">Year Of Publication</label>
            <input type="text" class="form-control" name="year" placeholder="Year" value={book.year} onChange={handleInput} />
            </div>
            <button type="submit" class="btn btn-primary">Add Book</button>
        </form>
    )
}

export default Addbook;