import type { CyHttpMessages, WaitOptions } from 'cypress/types/net-stubbing'

export const waitForApiCalls = (
  callback: () => Cypress.Chainable | void,
  options?: Partial<WaitOptions>,
) => {
  Cypress.log({
    name: 'wait for api calls',
  })
  cy.intercept('/api/*').as('graphqlQueries')

  callback()

  cy.wait('@graphqlQueries', options)
}

const hasOperationName = (
  req: CyHttpMessages.IncomingHttpRequest,
  operationName: string,
) => {
  const { body } = req

  return (
    Object.prototype.hasOwnProperty.call(req.body, 'operationName') &&
    body.operationName === operationName
  )
}

export const aliasGraphQLOperation = (
  req: CyHttpMessages.IncomingHttpRequest,
  operationName: string,
) => {
  if (hasOperationName(req, operationName)) {
    req.alias = operationName
  }
}

export const DefaultGraphQLRequestID = 'GraphqlRequest'

export const graphqlRequest = (
  body: Record<string, any> | string,
  alias = DefaultGraphQLRequestID,
  config?: any,
) =>
  cy
    .request({
      body,
      method: 'POST',
      url: '/api/graphql',
      ...config,
    })
    .as(alias)
