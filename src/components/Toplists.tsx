import { Stack } from '@mui/system';
import React, { useEffect } from 'react'
import { Book } from '../types/Book';
import BookPreview from './BookPreview';
import GenreToplists from './GenreToplists';

export default function Toplists() {
    
    const [fetchData, setFetchData] = React.useState([]);

    useEffect(() => {
      let sortedFetchData: Book[] = [];

      fetch('https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=QKfpPNEqp9Itrvb2AAgDW4PlTRxMFsHt')
        .then(response => response.json())
            .then(data => data.results.lists)
              .then((unSortedFetchData) => {
                console.log(unSortedFetchData);
                unSortedFetchData.forEach((list)=>{

                  let bookList : {listName : string, listOfBooks : Array<Book>} = {listName: list.list_name, listOfBooks: []};

                  list.books.forEach((book)=>{
                    bookList.listOfBooks.push({ 
                      title: book.title,
                      author: {name: book.author, key: ""},
                      description: book.description,
                      // rank: book.rank,
                      coverURL: book.book_image,
                      publishDate: book.published_date,
                      isbn_10: book.primary_isbn10,
                      isbn_13: book.primary_isbn13,
                      subjects: list.list_name,
                      numberOfPages: 0,
                    })
                  });

                  sortedFetchData.push(bookList);

                })
                
                setFetchData(sortedFetchData);
    
      })        

    }, []);

  return (
    <Stack
      direction = "column"
      spacing= {4}
      padding = '16px'
  >
    
    {fetchData.length > 0 &&
      fetchData.map((bookList : any) => {
        return (
          <><GenreToplists listName={bookList.listName} listOfBooks = {bookList.listOfBooks}          
          key = {bookList.listName + bookList.listOfBooks.length}
        />
        </>
        );
      })}
   
  </Stack>
  )
}
