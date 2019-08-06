import React, {useState} from 'react';
import {graphql} from 'react-apollo';
import {getBooksQuery} from '../queries/queries';
import BookDetail from './BookDetail';

const displayBooks = (books, setState) =>{
    var data = books;
    if(data.loading){
        return (<div>Loading Books...</div>)
    }else{
        return data.books.map(book => {
            return (
                <li key={book.id} onClick={(e)=> {setState({selected: book.id })}}>{book.name}</li>
            )
        });
    }
}


function BookList(props){
    const [state, setState] = useState({selected: null})
    return(
        <div>
            <ul className="book-list">
                
                {displayBooks(props.data, setState)}
            </ul>
            <BookDetail bookId={state.selected}/>
        </div>
    )
}

export default graphql(getBooksQuery)(BookList);