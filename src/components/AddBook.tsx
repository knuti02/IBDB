import React, { useState } from "react";
import axios from "axios";
import {
  collection,
  connectFirestoreEmulator,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Author } from "../types/Author";
import { Book } from "../types/Book";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import { TextField } from "@mui/material";

export default function AddBook() {
  const [bookIsbn, setBookIsbn] = useState("");
  const [status, setStatus] = useState("");
  const [inputValid, setInputValid] = useState(true);

  const fetchBookInfo = async (ISBN: string) => {
    setStatus("Henter bokdata...");
    return await fetch("https://openlibrary.org/isbn/" + bookIsbn + ".json")
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log("Det skjedde en feil ved henting av bokinfo: " + error);
      });
  };

  const fetchWorkData = async (workKey: string) => {
    return await fetch("https://openlibrary.org" + workKey + ".json")
      .then((result) => {
        return result.json();
      })
      .catch((error) => {
        console.log("En error oppsto ved henting av workdata: " + error);
      });
  };

  const fetchAuthorData = async (authorKey: string) => {
    return await fetch("https://openlibrary.org" + authorKey + ".json")
      .then((result) => {
        return result.json();
      })
      .catch((error) => {
        console.log("En error oppsto ved henting av author data: " + error);
      });
  };

  const onUpload = async () => {
    if (validateInput()) {
        setInputValid(true);
        const bookdata = await fetchBookInfo(bookIsbn);
        const works = await fetchWorkData(bookdata.works[0].key);
        const author = await fetchAuthorData(works.authors[0].author.key);
        let book: Book = {
        title: bookdata.title,
        description: works.description,
        author: author.name,
        isbn_13: bookdata.isbn_13[0],
        isbn_10: bookdata.isbn_10[0],
        coverURL:
            "https://covers.openlibrary.org/b/isbn/" +
            bookdata.isbn_13[0] +
            "-M.jpg",
        publishDate: new Date(bookdata.publish_date),
        series: bookdata?.series ? bookdata.series : null,
        numberOfPages: bookdata.number_of_pages,
        subjects: works.subjects,
        };
        setStatus("Bok lastes opp...");
        await submitBook(book);
        setStatus("Bok lagt til");
    } else {
        setInputValid(false);
    }
  };

  const validateInput = () => {
    return bookIsbn.length === 10 || bookIsbn.length === 13;
  }

  const submitBook = async (book: Book): Promise<void> => {
    try {
        await setDoc(doc(db, "books", book.isbn_13), book).then(() =>
        setStatus("Bok lastet opp!")
    ); 
        setBookIsbn("");      
    } catch (error) {
      console.log("Failed to submit to database" + error + "with data" + book);
      setStatus("Bok opplastning feilet");
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
        setBookIsbn(e.currentTarget.value);
    }
}

  return (
    <Stack
        direction={"row"}
        spacing={2}
        justifyContent="space-between">
      <TextField
        label="Skriv inn ISBN"
        type="number"
        data-testid="addBookInputField"
        error = { !inputValid }
        helperText="ISBN må være 10 eller 13 tall"
        fullWidth
        value={bookIsbn}
        onChange={(e) => setBookIsbn(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        //TODO valider antall siffer lagt inn
      />
      <Button size="medium" variant="contained" onClick={onUpload}>Add book to database</Button>
      {status.length > 0 && <p>{status}</p>}
    </Stack>
  );
}
