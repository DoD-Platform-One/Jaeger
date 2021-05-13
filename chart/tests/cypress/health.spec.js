describe('Basic', function() {
  it('Check UI is accessible', function() {
    cy.visit(Cypress.env('url'))
    cy.title().should("eq", "Jaeger UI");
    // Wait fifteen seconds for the service list to populate, then reload
    cy.wait(15000)
    cy.reload()
    cy.get('.ant-form-item-control-wrapper:first').click().type('{enter}');
    cy.get('.ant-btn').click();
    cy.get('.SearchResults--header').should("be.visible")
  })
})
