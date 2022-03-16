export const wrapSubject = (subject: any) => (subject ? cy.wrap(subject) : cy)
