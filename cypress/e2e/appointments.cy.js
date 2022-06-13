
describe("Appointment", () => {

  it("should book an interview", () => {

    // Visits the root of our web server
    cy.visit("/").contains("Monday");

    // Clicks on the "Add" button in the second appointment
    cy.get('[alt="Add"]').first().click()

    //find the input    
    // Enters their name
    cy.get('[data-testid="student-name-input"]').type("Fjord Windstar")
    // <input class="appointment__create-input text--semi-bold" name="name" type="text" placeholder="Enter Student Name" data-testid="student-name-input" value="">
    
    // Chooses an interviewer
    // <img class="interviewers__item-image" src="https://i.imgur.com/LpaY82x.png" alt="Sylvia Palmer">
    cy.get('[alt="Sylvia Palmer"]').click()
    
    // Clicks the save button
    cy.contains('[data-cy="submit"]', 'Save').click()

    // Sees the booked appointment
    cy.visit("/").contains("Fjord Windstar")


  })

  // it("should edit an interview", () => {
    
  //   // Visits the root of our web server
  //   // Clicks the edit button for the existing appointment
  //   // Changes the name and interviewer
  //   // Clicks the save button
  //   // Sees the edit to the appointment

  // })


  // it("should cancel an interview", () => {
    
  //   // Visits the root of our web server
  //   // Clicks the delete button for the existing appointment
  //   // Clicks the confirm button
  //   // Sees that the appointment slot is empty

  // })

})
