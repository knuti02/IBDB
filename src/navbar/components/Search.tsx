import React, { useState } from "react";
import { TextField, Stack, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Book } from "../../types/Book";

export default function Search () {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");
// treng me hele const Filterpage? idkkkkkk ahhahahaha. Ait for er bare litt forvirra over alle const[... ,set ...] - om me bruker alle liksom
    const booksRef = collection(db, "books");

    const filterBooksByGenre = () => {
        const filteredBooks = booksRef
            .filter(book => book.subjects.some(subject => subject.toLowerCase() === searchInput.toLowerCase()))
            .map((book) => ({ data: book }));  
        return filteredBooks;
      };

    const onSubmitSearch = async () => {
        if (searchInput === "" || searchInput === " ") {
            return;
        }
        const inputLower = searchInput.toLowerCase();
        const qTitle = query(booksRef, where("titleLowerCase", ">=", inputLower), where("titleLowerCase", "<=", inputLower+ "\uf8ff"));
        const qAuthor = query(booksRef, where("author.nameLowerCase", ">=", inputLower), where("author.nameLowerCase", "<=", inputLower+ "\uf8ff"));
        
        const querySnapshotTitle = await getDocs(qTitle);
        const querySnapshotAuthor = await getDocs(qAuthor);
        
        const books:Array<Book> = [];
        querySnapshotTitle.forEach((doc) => {
            books.push(doc.data() as Book);
        });
        querySnapshotAuthor.forEach((doc) => {
            books.push(doc.data() as Book);
        });
        
        const filteredBooks = filterBooksByGenre();
        
        filteredBooks.array.forEach((book) => {
            books.push(book)
        });

        setSearchInput("");
        navigate("/search/" + searchInput, {
            state: {
                searchResult: books
            }
        });
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
                label="Search on title, author or genre"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
            />
        </Stack>
    )
}