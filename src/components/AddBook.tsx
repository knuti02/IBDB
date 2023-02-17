import React, { useState } from "react";
import axios from "axios";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Author } from "../types/Author";
import { Book } from "../types/Book";

export default function AddBook() {
    
    const [bookIsbn, setBookIsbn] = useState("");
    const [status, setStatus] = useState("")
    const OPENLIBRARYURL = "https://cors-proxy.htmldriven.com/?url=";
    

    const fetchBookInfo = async () => {
        const bookUrl: string =  OPENLIBRARYURL + "https://openlibrary.org/isbn/" + bookIsbn + ".json";
        setStatus("Henter bokdata...");
        await fetch("https://openlibrary.org/isbn/" + bookIsbn + ".json")
            .then(function(response) {
                return response.json();
            })
            .then(async function(data) {
                let workData;
                console.log("https://openlibrary.org" + data.works[0].key + ".json")
                try {
                    workData = await fetch("https://openlibrary.org" + data.works[0].key + ".json");
                    console.log(workData)
                    if (workData == undefined || workData.authors == undefined) {
                        throw new Error("No work data found");  
                    }
                } catch (error) {
                    console.log(error);
                    return;
                }

                let author: Author;
                try {
                    const authorData = await fetch("https://openlibrary.org" + workData.authors[0].author.key + ".json");
                    author = {
                        name: authorData.json().name,
                        key: authorData.json().key,
                    }
                } catch (error) {
                    console.log(error);
                    return;
                }

                let book: Book = {
                    title: data.title,
                    description: workData.json()?.description,
                    author: author,
                    isbn_13: data.isbn_13[0],
                    isbn_10: data.isbn_10[0],
                    coverURL: "https://covers.openlibrary.org/b/isbn/" + data.isbn_13[0] + "-M.jpg",
                    publishDate: new Date(data.publish_date),
                    series: data?.series ? data.series : null,
                    numberOfPages: data.number_of_pages,
                    subjects: workData.json()?.subjects,
                }
                setStatus("Bok lastes opp...")
                await submitBook(book)
                setStatus("Bok lagt til")
            })
            .catch(function() {
                console.log("Catch error");
                setStatus("Error")
            });
    }
        
    

    const submitBook = async (book: Book) : Promise<void> => {
        try {
           await setDoc(doc(db, "books", book.isbn_13), { book })
           .then(() => setStatus("Bok lastet opp!"))
           setBookIsbn("");
        } catch (error) { 
            console.log("Failed to submit to database" + error + "with data" + book);
            setStatus("Bok opplastning feilet")
            
        }
        
    }

    return <div>
        <input
        type="number" 
        data-testid="addBookInputField"
        placeholder="Skriv inn ISBN"
        value={bookIsbn}
        onChange={(e) => setBookIsbn(e.currentTarget.value)}
        //TODO valider antall siffer lagt inn
        />
        <button onClick={fetchBookInfo}>Add book to database</button>
        {status.length > 0 && <p>{status}</p>}
    </div>
}