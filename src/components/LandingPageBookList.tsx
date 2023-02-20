import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import BookPreview from "./BookPreview";
import useFetch from "../hooks/useFetch";
import { Book } from "../types/Book";

export default function LandingPageBookList() {
  const { getBooks, books } = useFetch();
  useEffect(() => {
    const getInitialData = async () => {
      await getBooks();
    };
    getInitialData();
  }, []);

  return (
    <Stack
      padding="16px"
      justifyContent="center"
      direction="row"
      flexWrap="wrap"
      gap={2}
    >
      {books &&
        books.map((book: Book) => {
          return (
            <BookPreview
              title={book.title}
              imageSource={book.coverURL}
              author={book.author.name}
              ISBN={book.ISBN}
              description={book.description}
            />
          );
        })}
      <BookPreview
        title="Mer enn bare orden - 12 nye regler for livet"
        imageSource="https://www.norli.no/media/catalog/product/9/7/9788205541412_1_2.jpg?auto=webp&format=pjpg&width=960&height=1200&fit=cover"
        author="Jordan B. Peterson"
        ISBN="12345678910"
        description="Ny bok fra bestselgerforfatter Jordan B. Peterson!
        I sin forrige bok, 12 regler for livet, inspirerte psykologiprofessor Jordan B. Peterson millioner av mennesker over hele verden til å skape orden i en kaotisk tilværelse."
      />
      <BookPreview
        title="I dine sko"
        imageSource="https://www.norli.no/media/catalog/product/9/7/9788234712876_1_2.jpg?auto=webp&format=pjpg&width=960&height=1200&fit=cover"
        author="Jojo Moyes"
        ISBN="12345678911"
        description="Ny roman fra verdensfenomenet Jojo Moyes! I dine sko er en usedvanlig engasjerende historie om hvordan en liten tilfeldighet kan forandre alt - full av Jojo Moyes' humor, kløkt og varme. "
      />
      <BookPreview
        title="Gjøkungen"
        imageSource="https://www.norli.no/media/catalog/product/9/7/9788205579378_1.jpg?auto=webp&format=pjpg&width=960&height=1200&fit=cover"
        author="Camilla Läckberg"
        ISBN="12345678912"
        description="To grusomme hendelser, tilsynelatende uten forbindelser, ryster Fjällbacka."
      />
    </Stack>
  );
}
