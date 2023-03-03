import React, { useState } from "react";
import { TextField, Stack, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Search () {
    const [searchInput, setSearchInput] = useState("");

    const booksRef = collection(db, "books");

    const onSubmitSearch = async () => {
        const q = query(booksRef, where("title", ">=", searchInput), where("title", "<=", searchInput+ "\uf8ff"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data())
        });
        setSearchInput("");
    }

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
          onSubmitSearch();
        }
      };



    return (
        <Stack direction={"row"} spacing={1}>
            <IconButton aria-label="search" onClick={onSubmitSearch}>
                <SearchIcon fontSize="large"/>
            </IconButton>
            <TextField 
                label="Søk på tittel eller forfatter"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
            />
        </Stack>
    )
}