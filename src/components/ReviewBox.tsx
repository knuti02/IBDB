import { Rating, Typography } from '@mui/material';
import { Box, Stack, shadows } from '@mui/system';
import React from 'react'
type Props = {
    userName: String;
    rating: number;
    text: string; 
    //date: Date;
};

export default function ReviewBox(props: Props) {
    const { userName, rating, text } = props

  return (
    <Box 
        width={500}
        boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
        padding = {2}
        borderRadius = {1}
        marginTop = {3}
    >
        <Stack
            direction={"row"}
            justifyContent={"space-between"}
        >
            <Typography>{ userName }</Typography>
            <Typography>23.10.02</Typography>
        </Stack>
        <Rating value={ rating } readOnly />
        <Typography>{ text }</Typography>
    </Box>
  )
}
