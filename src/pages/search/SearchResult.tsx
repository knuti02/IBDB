import React from "react";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import BookPreview from "../../components/BookPreview";
import { Book } from "../../types/Book";
import { Stack } from "@mui/system";

export default function SearchResult() {
  const location = useLocation();
  const books = location.state.searchResult;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Søkeresultat:{" "}
      </Typography>
      <Stack padding="16px" justifyContent="center" direction="row" flexWrap="wrap" gap={2}>
        {books &&
          books.map((book: Book) => {
            return (
              <BookPreview
                key={book.isbn_13}
                title={book.title}
                imageSource={book.coverURL}
                author={book.author.name}
                ISBN={book.isbn_13}
                description={book.description}
              />
            );
          })}
      </Stack>
    </div>
  );
}
