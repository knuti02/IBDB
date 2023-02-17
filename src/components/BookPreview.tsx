import { Typography } from '@mui/material'
import { Box, fontSize, Stack } from '@mui/system'
import React from 'react'
type Props = {
    title: string, imageSource: string, author: string
}


export default function BookPreview(props: Props) {

    const {title, imageSource, author} = props
  return (
    <Stack direction={"column"} alignItems = "center" border = {1} width = {300}>
        <img src={imageSource} alt = {`Book cover for ${title}`} width = {300} height = {480}></img>
        <Typography>{title}</Typography>
        <Typography sx = {{fontStyle: 'oblique', fontSize: 10}}>
            {author}
        </Typography>
    </Stack>

  )
}
