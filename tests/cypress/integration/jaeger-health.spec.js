describe('Basic Jaeger', function() {
  it('Check Jaeger UI is accessible', function() {
      cy.visit(Cypress.env('url'))
  })
})
