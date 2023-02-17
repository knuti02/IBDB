import { Typography } from '@mui/material'
import { borderRadius, Box } from '@mui/system'
import React from 'react'

export default function LandingPage() {



  return (
    <Box
        display="flex"
        alignItems="center" 
        justifyContent="center"
        height="320px"
        border="solid 1px black"
        style={
            { 
                backgroundImage: 'url("https://t3.ftcdn.net/jpg/03/21/97/42/360_F_321974259_BnmlxfkknMol8HiQ0dg1bwQizor48uB9.jpg")',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center"
            }
        }
    >
        <Typography 
            variant='h1'
            style={
                {
                    backgroundColor: "#fff",
                    padding: "5px",
                    borderRadius: "3px"
                }
            }
        >
            IBDB
        </Typography>
    </Box>
  )
}
