const SESSION_COOKIE_NAME = Cypress.env('auth0SessionCookieName')

export const _clearAuth0Cookie = () => {
  cy.clearCookie(SESSION_COOKIE_NAME)
}

export const _clearAuth0SplittedCookies = () => {
  return cy.getCookies().then((cookies) => {
    cookies.forEach((cookie) => {
      if (cookie.name.startsWith(SESSION_COOKIE_NAME)) {
        cy.clearCookie(cookie.name)
      }
    })
  })
}

export const clearAuth0Cookies = () => {
  cy._clearAuth0Cookie()
  cy._clearAuth0SplittedCookies()
}
