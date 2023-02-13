import React from 'react'

export default function LandingPageBookList() {


  return (
    {books.forEach((book) => {
        return (<BookPreview 
            title={book.title} 
            imageSource={book.imageSource} 
            author={book.author}>
        )
    }))}
  )
}
