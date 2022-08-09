describe('URL Shortner Page Flow', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      fixture: "urls.json",
      statusCode: 200 
    })
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      long_url: "https://wallpaperheart.com/wp-content/uploads/2018/04/cool-1080p-wallpapers3.jpg",
      title: "Nice wallpaper",
      id: 3,
      short_url: "http://localhost:3001/useshorturl/3"
    })
    cy.visit('http://localhost:3000/')
  })
  it('should not GET if the server url is incorrect', () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3001/api/v1/url",
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404)
      expect(response.statusText).to.contain('Not Found')
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
  it('should insert information in the form', () => {
    cy.get('.input-title').type('Nice wallpaper')
    cy.get('.input-url').type('https://wallpaperheart.com/wp-content/uploads/2018/04/cool-1080p-wallpapers3.jpg')
  })
  it('should be able to submit a new url to be shortened', () => {
    cy.get('.input-title').type('Nice wallpaper')
    cy.get('.input-url').type('https://wallpaperheart.com/wp-content/uploads/2018/04/cool-1080p-wallpapers3.jpg')
    cy.get('.submit-button').click()
  })
  it('should render the new shortened url information', () => {
    cy.get('.input-title').type('Nice wallpaper')
    cy.get('.input-url').type('https://wallpaperheart.com/wp-content/uploads/2018/04/cool-1080p-wallpapers3.jpg')
    cy.get('.submit-button').click()
    cy.get('.url').should('have.length', 3)
    cy.get('.url').eq(2).contains('.url-title', 'Nice wallpaper')
    cy.get('.url').eq(2).contains('.url-short-link', 'http://localhost:3001/useshorturl/3')
    cy.get('.url').eq(2).contains('.url-long-link', 'https://wallpaperheart.com/wp-content/uploads/2018/04/cool-1080p-wallpapers3.jpg')
  })
  it('should not POST the new url without all of the required information', () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/v1/urls",
      body: {
        long_url: "https://wallpaperheart.com/wp-content/uploads/2018/04/cool-1080p-wallpapers3.jpg"
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(422)
      expect(response.statusText).to.contain('Unprocessable Entity')
    })
  })
})