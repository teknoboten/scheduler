
describe("Appointment", () => {

  beforeEach(() => {
    cy.request('GET', 'api/debug/reset')  //reset db
    cy.visit('/').contains("Monday");     //visit root url 
  })

  it("should book an interview", () => {

    // Clicks on the "Add" button in the second appointment
    cy.get('[alt="Add"]').first().click()

    //find the input    
    // Enters their name
    cy.get('[data-testid="student-name-input"]').type("Fjord Windstar")
    
    // Chooses an interviewer
    cy.get('[alt="Sylvia Palmer"]').click()
    
    // Clicks the save button
    cy.contains('Save').click()

    // Sees the booked appointment
    cy.contains(".appointment__card--show", "Fjord Windstar");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  })

  it("should edit an interview", () => {
    
    cy.get('[alt="Edit"]').first().click({force:true})  //force the click to override 'waiting for actionability' 
    cy.get('[data-testid="student-name-input"]').clear().type("Glen Windstar")
    cy.get('[alt="Tori Malcolm"]').click()
    cy.contains('Save').click()
    cy.contains(".appointment__card--show", "Glen Windstar");
    cy.contains(".appointment__card--show", "Tori Malcolm");

  })


  it("should cancel an interview", () => {

    //Clicks the delete button
    cy.get('[alt="Delete"]').first().click({force:true})

    // Clicks the confirm button
    cy.contains('[data-cy="submit"]', 'Yes').click()

    // Sees that the appointment slot is empty
    cy.contains('Deleting...').should('exist')
    cy.contains('Deleting...').should('not.exist')
    cy.contains('.appointment__card--show', 'Archie Cohen').should('not.exist')

  })

})
