import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
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

  it("Should render Bok1 with passed props", () => {
    const images = screen.getAllByRole("img");

    const author = screen.getByText("Jordan B. Peterson");
    expect(author).toBeInTheDocument();

    const title = screen.getByText("Mer enn bare orden - 12 nye regler for livet");
    expect(title).toBeInTheDocument();

    expect(images[images.length - 3]).toHaveAttribute(
      "alt",
      "Book cover for Mer enn bare orden - 12 nye regler for livet"
    );
  });

  it("Should render Bok2 with passed props", () => {
    const images = screen.getAllByRole("img");

    const author = screen.getByText("Jojo Moyes");
    expect(author).toBeInTheDocument();

    const title = screen.getByText("I dine sko");
    expect(title).toBeInTheDocument();

    expect(images[images.length - 2]).toHaveAttribute("alt", "Book cover for I dine sko");
  });

  it("Should render Bok3 with passed props", () => {
    const images = screen.getAllByRole("img");

    const author = screen.getByText("Camilla Läckberg");
    expect(author).toBeInTheDocument();

    const title = screen.getByText("Gjøkungen");
    expect(title).toBeInTheDocument();

    expect(images[images.length - 1]).toHaveAttribute("alt", "Book cover for Gjøkungen");
  });
});
