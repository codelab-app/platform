import type { CyHttpMessages } from 'cypress/types/net-stubbing'

export const interceptGraphQL = (
  interceptor: (req: CyHttpMessages.IncomingHttpRequest) => void,
) => {
  cy.intercept('POST', '/api/graphql', interceptor)
}

export const waitForApiCalls = () => {
  cy.intercept('/api/*').as('graphqlQueries')
  cy.wait('@graphqlQueries')
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