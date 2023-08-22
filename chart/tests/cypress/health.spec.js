describe('Basic', function() {
  it('Check UI is accessible', function() {
    cy.visit(Cypress.env('url'))
    if (Cypress.env('keycloak_test_enable')) {
      cy.wait(3000)
      cy.get('input[id="username"]')
        .type(Cypress.env('tnr_username'))
        .should('have.value', Cypress.env('tnr_username'));

      cy.get('input[id="password"]')
        .type(Cypress.env('tnr_password'))
        .should('have.value', Cypress.env('tnr_password'));
          
      cy.get('form').submit(); 

      cy.get('input[id="kc-accept"]').click(); 
    }
    cy.title().should("eq", "Jaeger UI");
    // Wait fifteen seconds for the service list to populate, then reload
    cy.wait(15000)
    cy.reload()
    cy.get('.ant-form-item-control-wrapper:first').click().type('{enter}');
    cy.get('.ant-btn').click();
    cy.get('.SearchResults--header').should("be.visible")
  })
})
