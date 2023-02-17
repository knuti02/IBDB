import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import BookPreview from "./BookPreview";
import useFetch from "../hooks/useFetch";

type Book = {
  title: string;
  author: string;
  img_url: string;
};

export default function LandingPageBookList() {
  console.log("hei");

  const { getBooks, books } = useFetch();
  useEffect(() => {
    const getInitialData = async () => {
      await getBooks();
    };
    getInitialData();
  }, []);

  return (
    <Stack direction="row" flexWrap="wrap">
      {books.map((book: Book) => {
        return (
          <BookPreview
            title={book.title}
            imageSource={book.img_url}
            author={book.author}
          />
        );
      })}
      <BookPreview
        title="Mer enn bare orden - 12 nye regler for livet"
        imageSource="https://www.norli.no/media/catalog/product/9/7/9788205541412_1_2.jpg?auto=webp&format=pjpg&width=960&height=1200&fit=cover"
        author="Jordan B. Peterson"
      />
      <BookPreview
        title="I dine sko"
        imageSource="https://www.norli.no/media/catalog/product/9/7/9788234712876_1_2.jpg?auto=webp&format=pjpg&width=960&height=1200&fit=cover"
        author="Jojo Moyes"
      />
      <BookPreview
        title="Gjøkungen"
        imageSource="https://www.norli.no/media/catalog/product/9/7/9788205579378_1.jpg?auto=webp&format=pjpg&width=960&height=1200&fit=cover"
        author="Camilla Läckberg"
      />
    </Stack>
  );
}
