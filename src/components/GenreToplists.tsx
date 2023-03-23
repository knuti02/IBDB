import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react'
import { Book } from '../types/Book';
import BookPreview from './BookPreview';

type ComponentProps = {
    listName: string;
    listOfBooks: Array<Book>;
    

}

export default function GenreToplists(props : ComponentProps) {
  
    const {listName, listOfBooks} = props;

  
    return (
        <Stack directection = "column" >
            <Typography variant='h4' fontWeight='bold'> 
                {listName}
            </Typography>
            <Stack 
            direction = "row"
            spacing={4}
            sx={{
              overflowX: "scroll",
              scrollBehavior: "smooth",
            } 
            }>
                
                {listOfBooks.map((book: Book) => {
                    return (
                        <BookPreview
                            title={book.title}
                            imageSource={book.coverURL}
                            author={book.author.name}
                            ISBN={book.isbn_13}
                            description={book.description}
                            key = {book.isbn_10 + book.isbn_13}
                        />
                    )
                })
                }
            </Stack>
        </Stack>
  )
}
