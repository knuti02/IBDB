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

export default function AddBook() {
  const [bookIsbn, setBookIsbn] = useState("");
  const [status, setStatus] = useState("");

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
    const bookdata = await fetchBookInfo(bookIsbn);
    const works = await fetchWorkData(bookdata.works[0].key);
    const author: Author = await fetchAuthorData(works.authors[0].author.key);
    const { name, key } = author;
    let book: Book = {
      title: bookdata.title,
      description: works.description.value,
      author: { name: name, key: key },
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
  };

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

  return (
    <div>
      <input
        type="number"
        data-testid="addBookInputField"
        placeholder="Skriv inn ISBN"
        value={bookIsbn}
        onChange={(e) => setBookIsbn(e.currentTarget.value)}
        //TODO valider antall siffer lagt inn
      />
      <button onClick={onUpload}>Add book to database</button>
      {status.length > 0 && <p>{status}</p>}
    </div>
  );
}
