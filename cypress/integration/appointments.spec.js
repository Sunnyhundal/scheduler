//set up the test
describe("Appointments", () => {
  //reset the database before each test and visit the root of our web server before each test.
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });
  //test the booking of an interview
  it("should book an interview", () => {
    // Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]").first().click();
    // Enters their name and chooses an interviewer and clicks the save button
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get('[alt="Sylvia Palmer"]').click();

    cy.contains("Save").click();
    // Sees the booked appointment and the student name and interviewer name is shown
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  //test the editing of an interview
  it("should edit an interview", () => {
    // Clicks the edit button for the existing appointment
    cy.get("[alt=Edit]").first().click({ force: true });
    // Changes the name and interviewer and clicks the save button
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();
    // Sees the edit to the appointment and the student name and interviewer name is shown
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
  //test the cancelling of an interview
  it("should cancel an interview", () => {
    // Clicks the delete button for the existing appointment and clicks the confirm button
    cy.get("[alt=Delete]").click({ force: true });

    cy.contains("Confirm").click();
    // Sees that the appointment slot is empty and the Deleting indicator is shown and then not shown
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    // Sees that the appointment slot is empty and the appointment is not shown
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
