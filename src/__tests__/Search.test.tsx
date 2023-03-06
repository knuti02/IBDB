import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Search from "../navbar/components/Search";
import userEvent  from '@testing-library/user-event'

describe("Test Search component", () => {
    let searchInput:HTMLInputElement, submitButton:HTMLInputElement;
    beforeEach(() => {
      render(
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      );
      searchInput = screen.getByLabelText("Søk på tittel eller forfatter");
      submitButton = screen.getByLabelText("search");
    });

    it("renders submit button", () => {
        expect(submitButton).toBeInTheDocument();
      });

    it("Should render search input", () => {
        expect(searchInput).toBeInTheDocument();
        
    });

    it("Should change input value when changed", () => {
        fireEvent.change(searchInput, {target: {value: "Harry Potter"}})
        expect(searchInput.value).toBe("Harry Potter")
    });

    it("when enter is clicked", async () => {
        fireEvent.keyDown(searchInput, {key: "Enter", code: "Enter", charCode: 13})
        await waitFor(() => {
            expect(screen.getByText("Søkeresultat: ")).toBeInTheDocument();
        }, { timeout: 1000 });
    });

    it("Searchbutton is clicked", async () => {
        const user = userEvent.setup();
        const spyAnchorTag = vi.spyOn(user, "click"); 
        await user.click(submitButton);
        expect(spyAnchorTag).toHaveBeenCalledOnce();
    });

    





});
