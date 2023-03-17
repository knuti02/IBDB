// import { describe, it, expect, vi } from "vitest";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { MemoryRouter, useLocation } from "react-router-dom";
// import Search from "../navbar/components/Search";
// import userEvent from "@testing-library/user-event";
// import { Provider } from "react-redux";
// import { store } from "../redux/store";

// const LocationTest = () => {
//   const location = useLocation();
//   return (
//     <div>
//       <p>{location.pathname}</p>
//     </div>
//   );
// };

// describe("Test Search component", () => {
//   let searchInput: HTMLInputElement, submitButton: HTMLInputElement;
//   beforeEach(() => {
//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <Search />
//           <LocationTest />
//         </MemoryRouter>
//       </Provider>
//     );
//     searchInput = screen.getByLabelText("Søk på tittel eller forfatter");
//     submitButton = screen.getByLabelText("search");
//   });

//   afterEach(() => {
//     vi.restoreAllMocks();
//   });

//   it("renders submit button", () => {
//     expect(submitButton).toBeInTheDocument();
//   });

//   it("Should render search input", () => {
//     expect(searchInput).toBeInTheDocument();
//   });

//   it("Should change input value when changed", () => {
//     fireEvent.change(searchInput, { target: { value: "Harry Potter" } });
//     expect(searchInput.value).toBe("Harry Potter");
//   });

//   // it("when enter is clicked", async () => {
//   //     //fireEvent.keyDown(searchInput, {key: "Enter", code: "Enter", charCode: 13})
//   //     fireEvent.submit(searchInput)
//   //     await waitFor(() => {
//   //         expect(screen.getByText("Søkeresultat: ")).toBeInTheDocument();
//   //         screen.debug()
//   //     }, { timeout: 3000 });
//   // });

//   it("Searchbutton is clicked", async () => {
//     const user = userEvent.setup();
//     const spyAnchorTag = vi.spyOn(user, "click");
//     await user.click(submitButton);
//     expect(spyAnchorTag).toHaveBeenCalledOnce();
//   });

//   // it("Click on searchbutton redirects to result page", async () => {
//   //   fireEvent.click(submitButton);
//   //   await waitFor(() => {
//   //     expect(screen.getByText("Søkeresultat: ")).toBeInTheDocument();
//   //     screen.debug()
//   //   }, { timeout: 1000});
//   // });
// });
