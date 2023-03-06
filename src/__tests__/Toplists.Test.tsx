import { beforeEach, describe } from "vitest";
import { render, screen } from "@testing-library/react";

import Toplists from "../components/Toplists";
import App from "../App";
import { MemoryRouter } from "react-router-dom";

// How check code coverage?

describe("Toplists", () => {
    beforeEach(() => {
        render(
          <MemoryRouter>
            <Toplists />
          </MemoryRouter>
        );
      });

      it("Should test if we fetch books", () => {
        const images = screen.getAllByRole("img");
        
        
        // const mockBooks = [
        //     {
        //         title: "The Alchemist",
        //     }
        // ]
        // const book = screen.getByText("The Alchemist");
        // expect(book).toBeInTheDocument();
      });

      it("Should show a list of books sorted after genre", () => {
        const genre = screen.getByText("Fantasy");
        expect(genre).toBeInTheDocument();
      });
});