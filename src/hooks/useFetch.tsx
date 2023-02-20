import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function useFetch() {
  const [books, setBooks] = useState(undefined);

  const getBooks = async () => {
    const ref = collection(db, "books");
    const snapShot = await getDocs(ref);
    const fetchData: Array<any> = [];
    snapShot.forEach((doc) => {
      fetchData.push({ ...doc.data(), ISBN: doc.id });
    });
    setBooks(fetchData);
  };

  return { getBooks, books };
}
