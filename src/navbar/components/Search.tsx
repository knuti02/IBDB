import React, { useState } from "react";
import { TextField, Stack, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function Search () {
    const [searchInput, setSearchInput] = useState("");


    return (
        <Stack direction={"row"} spacing={1}>
            <IconButton aria-label="search">
                <SearchIcon fontSize="large"/>
            </IconButton>
            <TextField 
                label="Søk på tittel eller forfatter"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.currentTarget.value)}
            />
        </Stack>
    )
}