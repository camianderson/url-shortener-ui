describe('URL Shortner Page Flow', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      fixture: "urls.json",
      statusCode: 200 
    })
  })
  it('should visit the main page', () => {
    cy.visit('http://localhost:3000/')
  })
  it('should render the title', () => {
    cy.contains('.page-title', 'URL Shortener')
  })
  it('should render the form', () => {
    cy.get('form').should('exist')
    cy.get('.input-title').should('exist')
    cy.get('.input-url').should('exist')
    cy.get('.submit-button').should('exist')
  })
  it('should render all the shortened Urls', () => {
    cy.get('.url').should('have.length', 2)
    cy.get('.url').eq(0).contains('.url-title', 'Awesome photo')
    cy.get('.url').eq(0).contains('.url-short-link', 'http://localhost:3001/useshorturl/1')
    cy.get('.url').eq(0).contains('.url-long-link', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
  })
})