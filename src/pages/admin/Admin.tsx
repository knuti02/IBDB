import React from 'react'
import AddBook from '../../components/AddBook'
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function Admin () {
  return (
    <Box sx={{width: "60%", margin: "auto"}} >
      <Typography variant="h3" gutterBottom>Legg til bok i databasen</Typography>
      <AddBook />
    </Box>
  )
}
