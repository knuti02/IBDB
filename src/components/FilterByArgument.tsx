  import React, { useState, useEffect } from 'react';
  import { auth } from '../firebase';
  import useFetch from '../hooks/useFetch';

  import TextField from '@mui/material/TextField';
  import Button from '@mui/material/Button';
  import Stack from '@mui/material/Stack';
  import { Box } from '@mui/material';

  import { Book } from "../types/Book";
  import BookPreview from "./BookPreview";

  const FilterPage = () => {
    const [filterArgument, setFilterArgument] = useState('genre'); 
    const [selectedGenre, setSelectedGenre] = useState('');
    const [searched, setSearched] = useState(false);

    const { getBooks, books } = useFetch();
    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
      const getInitialData = async () => {
        await getBooks();
      };
      getInitialData();
    }, []);

    const filterBooksByGenre = () => {
      if (books) {
        const filteredBooks = books
          .filter(book => book.subjects.some(subject => subject.toLowerCase() === selectedGenre.toLowerCase()))
          .map((book) => ({ data: book }));  
        setFilteredBooks(filteredBooks);
        setSearched(true);
        
        return filteredBooks;
      } 
    };
    
    
    return (
      <Box sx={{ width: '50%', margin: '0 auto' }}>
      
        <TextField 
          id="outlined-basic" 
          label="Genre" 
          variant="outlined" 
          onChange={(e) => setSelectedGenre(e.currentTarget.value)}
        />

        <Button variant="contained" onClick={filterBooksByGenre}>
          Filter
        </Button>

        <Stack spacing={2}>
        {books && searched && filteredBooks.length === 0 && <div>No books found</div>}
        {books && filteredBooks.map((book) => {
          try {
            return (
              <BookPreview
                key={book.ISBN}
                title={book.title}
                imageSource={book.coverURL}
                author={book.author ? book.author.name : ''}
                ISBN={book.ISBN}
                description={book.description}
              />
            );
          } catch (error) {
            console.error(`Error rendering book with ISBN ${book.ISBN}: `, error);
          }
        })}
      </Stack>
    </Box>
  );
};

  export default FilterPage;
