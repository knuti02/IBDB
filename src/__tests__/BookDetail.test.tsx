import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import LandingPageBookList from "../components/LandingPageBookList";

describe("Test LandingPageList component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <LandingPageBookList />
      </MemoryRouter>
    );
  });

  it("Should show BookDetail when pressing a book", () => {
    const images = screen.getAllByRole("img");

    fireEvent.click(images[images.length - 3]);

    const author = screen.getByText("Jordan B. Peterson");
    expect(author).toBeInTheDocument();

    const title = screen.getByText(
      "Mer enn bare orden - 12 nye regler for livet"
    );
    expect(title).toBeInTheDocument();

    expect(images[images.length - 3]).toHaveAttribute(
      "alt",
      "Book cover for Mer enn bare orden - 12 nye regler for livet"
    );
  });
});
