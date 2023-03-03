import { Stack } from '@mui/system';
import React, { useEffect } from 'react'
import { Book } from '../types/Book';
import BookPreview from './BookPreview';

export default function Toplists() {
    
    const [fetchData, setFetchData] = React.useState([]);

    useEffect(() => {
      let sortedFetchData: Book[] = [];

      fetch('https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=QKfpPNEqp9Itrvb2AAgDW4PlTRxMFsHt')
        .then(response => response.json())
            .then(data => data.results.lists)
              .then((unSortedFetchData) => {

                unSortedFetchData.forEach((list)=>{ 
                  list.books.forEach((book)=>{
                    sortedFetchData.push({ 
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

                  setFetchData(sortedFetchData);
              })
    
      })        

    }, []);

  return (
    <Stack
    padding="16px"
    justifyContent="center"
    direction="row"
    flexWrap="wrap"
    gap={2}
  >
    
    {fetchData.length > 0 &&
      fetchData.map((book: Book) => {
        return (
          <><BookPreview
          title={book.title}
          imageSource={book.coverURL}
          author={book.author.name}
          ISBN={book.isbn_13}
          description={book.description}
        />
        </>
        );
      })}
   
  </Stack>
  )
}
