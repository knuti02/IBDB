import React, { useState } from "react";
import axios from "axios";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Author } from "../types/Author";
import { Book } from "../types/Book";

export default function AddBook() {
    
    const [bookIsbn, setBookIsbn] = useState("");
    

    const fetchBookInfo = () => {
        const bookUrl: string =  "https://openlibrary.org/isbn/" + bookIsbn + ".json";
        
        axios.get(bookUrl)
            .then(function(response) {
                return response.data;
            })
            .then(async function(data) {
                let workData;
                try {
                    workData = await axios.get("https://openlibrary.org" + data.works[0].key + ".json");
                    if (workData.data == undefined || workData.data.authors == undefined) {
                        throw new Error("No work data found");  
                    }
                } catch (error) {
                    console.log(error);
                    return;
                }

                let author: Author;
                try {
                    const authorData = await axios.get("https://openlibrary.org" + workData.data.authors[0].author.key + ".json");
                    author = {
                        name: authorData.data.name,
                        key: authorData.data.key,
                    }
                } catch (error) {
                    console.log(error);
                    return;
                }

                let book: Book = {
                    title: data.title,
                    description: workData.data?.description,
                    author: author,
                    isbn_13: data.isbn_13[0],
                    isbn_10: data.isbn_10[0],
                    coverURL: "https://covers.openlibrary.org/b/isbn/" + data.isbn_13[0] + "-M.jpg",
                    publishDate: new Date(data.publish_date),
                    series: data?.series,
                    numberOfPages: data.number_of_pages,
                    subjects: workData.data?.subjects,
                }
                submitBook(book);
            })
            .catch(function() {
                console.log("Catch error");
            });
    }
        
    

    const submitBook = (book: Book) : void => {
        try {
           addDoc(collection(db, "books"), { book }); 
        } catch (error) {
            console.log("Failed to submit to database" + error + "with data" + book);
        }
        
    }

    return <div>
        <input
        type="number"
        placeholder="Skriv inn ISBN"
        value={bookIsbn}
        onChange={(e) => setBookIsbn(e.currentTarget.value)}
        />
        <button onClick={fetchBookInfo}>Add book to database</button>
    </div>
}