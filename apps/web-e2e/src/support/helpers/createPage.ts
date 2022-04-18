export const createAppWithCypress = (appName: string) => {
  cy.visit('/apps')
  cy.getSpinner().should('not.exist')
  cy.findAllByText(appName, { exact: true, timeout: 0 }).should('not.exist')
  cy.getButton({ label: /Create App/ }).click()
  cy.getModal().setFormFieldValue({ label: 'Name', value: appName })
  cy.getModal()
    .getModalAction(/Create App/)
    .click()
  cy.getModal().should('not.exist')
  cy.findByText(appName).should('exist')
  cy.findAllByText(appName).click()
  cy.url().should('include', '/pages')
}
