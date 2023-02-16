import { Stack } from '@mui/material'
import React, { useEffect } from 'react'
import BookPreview from './BookPreview'
import useFetch from '../hooks/useFetch'


export default function LandingPageBookList() {
    console.log("hei")

    const {getBooks, books} = useFetch()
    useEffect(() => {

        const getInitialData = async() => {
            await getBooks()
        }
        getInitialData()
    },[])

  return (
    <Stack 
        direction="row"
        flexWrap="wrap"
    >   
        {books.map((book) => {
            return (
        <BookPreview 
                title={book.title} 
                imageSource={book.img_url} 
                author={book.author} />)
        })}
            
    </Stack>
  )
}
