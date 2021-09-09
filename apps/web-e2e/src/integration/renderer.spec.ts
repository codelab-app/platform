// App
const appName = 'AppRender'
let appId: string
// Page
const pageName = 'PageRender'
let pageId: string

describe('Renderer', () => {
  it('Check page render from fixture', () => {
    cy.intercept('POST', '/mock-endpoint', {
      fixture: 'renderer.json',
    }).as('apiCheck')
    cy.visit(`/renderer`)
    cy.wait('@apiCheck').then((interception: any) => {
      console.log(interception.response.body)

      assert.isNotNull(interception.response.body, '1st API call has data')
    })
  })
})
