import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import useFetch from '../hooks/useFetch';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';


const FilterPage = () => {
  const [filterArgument, setFilterArgument] = useState('genre'); 
  const [selectedGenre, setSelectedGenre] = useState('');
  const [books, setBooks] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const result = await useFetch().getBooks();
      setBooks(result);
    };
    fetchBooks();
  }, []);

  const filterBooksByGenre = () => {
    if (books) {
      const filteredBooks = books.filter(book => book.subjects.includes(selectedGenre));
      setBooks(filteredBooks);
      setSearched(true);
    }
  };

  const selectGenre = (genre) => {
    setSelectedGenre(genre);
  };

  if (!books) {
    return <div>Loading...</div>;
  }
    
  return (
    <Box sx={{ width: '50%', margin: '0 auto' }}>
      <TextField 
        id="outlined-basic" 
        label="Genre" 
        variant="outlined" 
        onChange={(e) => setSelectedGenre(e.target.value)}
      />
      <Button variant="contained" onClick={() => filterBooksByGenre(selectedGenre)}>
        Filter
      </Button>
      <Stack spacing={2}>
        {searched && books.length === 0 && <div>No books found</div>}
        {books.map(book => (
          <div key={book.ISBN}>{book.title}</div>
        ))}
      </Stack>
    </Box>
  );
};

export default FilterPage;
