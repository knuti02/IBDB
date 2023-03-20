import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import LandingPageBookList from "../components/LandingPageBookList";
import { Provider } from "react-redux";
import { store } from "../redux/store";

describe("Test LandingPageList component", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LandingPageBookList />
        </MemoryRouter>
      </Provider>
    );
  });

  it("Should show BookDetail when pressing a book", () => {
    const images = screen.getAllByRole("img");

    fireEvent.click(images[images.length - 3]);

    const author = screen.getByText("Jordan B. Peterson");
    expect(author).toBeInTheDocument();

    const title = screen.getByText("Mer enn bare orden - 12 nye regler for livet");
    expect(title).toBeInTheDocument();

    expect(images[images.length - 3]).toHaveAttribute(
      "alt",
      "Book cover for Mer enn bare orden - 12 nye regler for livet"
    );
  });
});
