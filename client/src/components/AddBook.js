import React, {useState} from 'react';
import {graphql, compose} from 'react-apollo';
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries'
import BookList from './BookList';

const displayAuthors = (data) => {

    if(data.loading){
        return (
        <option>Loading Authors....</option>);
        }else{
            return data.authors.map( author=> {
                return (<option key={author.id} value={author.id}>{author.name}</option>)
            });
        }
    }


function AddBook(props){

    const [book, setBook] = useState({name: '', genre: '', authorId: '' })


    const submitForm = (e) => {
        e.preventDefault();
        console.log(book);
        props.addBookMutation({
            variables:{
                name: book.name,
                genre: book.genre,
                authorId: book.authorId
            },
            refetchQueries: [{query: getBooksQuery}]
        });
    }
    
    return(
        <div>
                <form className="add-book" onSubmit={submitForm}>
                    <div className="field">
                        <label htmlFor="">Book name:</label>
                        <input type="text" onChange={(e) => setBook({...book, name: e.target.value})} />
                    </div>
                    
                    <div className="field">
                        <label htmlFor="">Genre:</label>
                        <input type="text" onChange={(e) => setBook({...book,  genre: e.target.value})} />
                    </div>

                    <div className="field">
                        <label htmlFor="">Author:</label>
                        <select name="" id="" onChange={(e) => setBook({...book, authorId: e.target.value})} > 
                            <option value="">Select author</option>
                            {displayAuthors(props.getAuthorsQuery)}
                        </select>
                    </div>
                    <button>+</button>
                </form>
        </div>
    )
}


export default compose(
    graphql(getAuthorsQuery,{name: 'getAuthorsQuery'}),
    graphql(addBookMutation, {name: 'addBookMutation'})
)(AddBook);