import React from "react";
import {
  render,
  cleanup,
  waitForElement,
  getByText,
  getAllByText,
  getAllByTestId,
  queryByText,
  prettyDOM,
  getByAltText,
  getByPlaceholderText,
  fireEvent,
} from "@testing-library/react";
import Application from "components/Application";
import Appointment from "components/Appointment";
import axios from "axios";

afterEach(cleanup);

it("defaults to Monday and changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday")).then(() => {
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});

// Render Application component
it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container, debug } = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));
  console.log(prettyDOM(container));

  const appointments = getAllByTestId(container, "appointment");
  console.log(prettyDOM(appointments));

  const appointment = getAllByTestId(container, "appointment")[0];
  console.log(prettyDOM(appointment));

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" },
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  const day = getAllByTestId(container, "day").find((day) =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "no spots remaining")).toBeInTheDocument();
});

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    (appointment) => queryByText(appointment, "Archie Cohen")
  );
  fireEvent.click(getByAltText(appointment, "Delete"));

  // 4. Check that the confirmation message is shown.
  expect(
    getByText(appointment, "Are you sure you would like to delete?")
  ).toBeInTheDocument();

  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(getByText(appointment, "Confirm"));

  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, "Add"));

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".

  const day = getAllByTestId(container, "day").find((day) =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
});

it("loads data, edits an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);
  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));
  // 3. Click the "Edit" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    (appointment) => queryByText(appointment, "Archie Cohen")
  );
  fireEvent.click(getByAltText(appointment, "Edit"));
  // 4. Check that the form is shown.
  expect(getByText(appointment, "Save")).toBeInTheDocument();
  // 5. Change the name and interviewer.
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Leopold Silvers" },
  });
  fireEvent.click(getByAltText(appointment, "Tori Malcolm"));
  // 6. Click the "Save" button on the confirmation.
  fireEvent.click(getByText(appointment, "Save"));
  // 7. Check that the element with the text "Saving" is displayed.
  expect(getByText(appointment, "Saving")).toBeInTheDocument();
  // 8. Wait until the element with the new student name is displayed.
  await waitForElement(() => getByText(appointment, "Leopold Silvers"));
  // 9. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining". - since we are editing, not adding a new appointment, the spots for Monday should remain the same.
  const day = getAllByTestId(container, "day").find((day) =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
});


//"shows the save error when failing to save an appointment"
it("shows the save error when failing to save an appointment", () => {
  axios.put.mockRejectedValueOnce();
});

//"shows the delete error when failing to delete an existing appointment"
it("shows the delete error when failing to delete an existing appointment", () => {
  axios.delete.mockRejectedValueOnce();
});
