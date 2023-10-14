// // We are rendering `<Application />` down below, so we need React.createElement

// import React from "react";

// /*
//   We import our helper functions from the react-testing-library
//   The render function allows us to render Components
// */
// import { render, screen } from "@testing-library/react";

// /*
//   We import the component that we are testing
// */
// import Appointment from "components/Appointment";
// import Application from "components/Application";
// import { getAllByTestId, container, prettyDOM } from "@testing-library/react";
// import { act } from "react-test-renderer";
// import { get } from "request";

// /*
//   A test that renders a React Component
// */

// // Tests to render the Appointment component with no props or crashing
// describe("Appointment", () => {
//   it("renders without crashing", () => {
//     render(<Appointment />);
//   });

//   it("does something it is supposed to do", () => {

//   });

//   it("does something else it is supposed to do", () => {
//     // ...
//   });
// });

// it("loads data, books an interview and reduces the spots remaining for Monday by 1", () => {
//   const { container } = render(<Application />);
//   console.log(container);
// });

// it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
//   const { container } = render(<Application />);

//   await waitForElement(() => getByText(container, "Archie Cohen"));

//   console.log(prettyDOM(container));
// });
