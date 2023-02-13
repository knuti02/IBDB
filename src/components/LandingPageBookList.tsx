import { Stack } from '@mui/material'
import React from 'react'
import BookPreview from './BookPreview'

export default function LandingPageBookList() {


  return (
    <BookPreview
        title="Peppa pig"
        imageSource ="https://images.booksense.com/images/052/310/9780593310052.jpg" 
        author='Lukas'
    />
    // <Stack 
    //     direction="row"
    //     flexWrap="wrap"
    // >
    //     <BookPreview
    //         title="Peppa pig"
    //         imageSource ="https://images.booksense.com/images/052/310/9780593310052.jpg" 
    //         author='Lukas'
    //     />
    //     <BookPreview
    //         title="Peppa pig"
    //         imageSource ="https://images.booksense.com/images/052/310/9780593310052.jpg" 
    //         author='Lukas'
    //     />
    //     <BookPreview
    //     title="Peppa pig"
    //     imageSource ="https://images.booksense.com/images/052/310/9780593310052.jpg" 
    //     author='Lukas'
    //     />
    // </Stack>
    // {books.forEach((book) => {
    //     return (<BookPreview 
    //         title={book.title} 
    //         imageSource={book.imageSource} 
    //         author={book.author}>
    //     )
    // }))}
  )
}
