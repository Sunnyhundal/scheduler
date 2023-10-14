import React from "react";
import {
  render,
  cleanup,
  waitForElement,
  getByText,
  getAllByText,
  getAllByTestId,
  prettyDOM,
  getByAltText,
  getByPlaceholderText,
  fireEvent,
} from "@testing-library/react";
import Application from "components/Application";
//import Appointment from "components/Appointment";

afterEach(cleanup);

it("defaults to Monday and changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday")).then(() => {
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});

// Render Application component
xit("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));
});












// Tests to render the Appointment component with no props or crashing
// describe("Appointment", () => {
//   it("renders without crashing", () => {
//     render(<Appointment />);
//   });

//   it("does something it is supposed to do", () => {});

//   it("does something else it is supposed to do", () => {
//     // ...
//   });
// });

xit("loads data, books an interview and reduces the spots remaining for Monday by 1", () => {
  const { container } = render(<Application />);
  console.log(container);
});

xit("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  console.log(prettyDOM(container));
});
