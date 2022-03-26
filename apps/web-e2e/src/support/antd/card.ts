export const getCardTitle = () => {
  return cy.get('.ant-card-head-title')
}

export const getCardContent = () => {
  return cy.get('.ant-card-body')
}

export const getCardActions = () => {
  return cy.get('.ant-card-extra')
}
