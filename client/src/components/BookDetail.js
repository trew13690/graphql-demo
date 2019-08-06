import React from 'react';
import {graphql} from 'react-apollo';
import {getBookQuery} from '../queries/queries'

const displayBookDetail = (data)=> {
    const {book} = data;
    if(book){
        return (
            <div className="">
                <h2> {book.name}</h2>
                <p>Genre: {book.genre}</p>
                <p>Author: {book.author.name}</p>
                <p>All Books by this author:</p>
                <ul className="other-books">
                    {
                        book.author.books.map((item)=> {
                            return <li key={item.id}>{item.name}</li>
                    })
                }
                </ul>
            </div>
        )
    }

    else{
        return (
            <div className="">No book selected...</div>
        )
    }
}


function BookDetail(props){

    console.log(props);

    return(
        <div className="book-details">
           {displayBookDetail(props.data)}
        </div>
    )
}



export default graphql(getBookQuery, {options: (props)=> {
    return {
        variables:{
            id: props.bookId
        }
    }
}
})(BookDetail);