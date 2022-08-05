export const logInIfInAuth0Page = () =>
  cy.url().then((url) => {
    if (!url.includes('auth0')) {
      return false
    }

    return cy.login().then(() => true)
  })
