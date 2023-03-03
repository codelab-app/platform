import type { CyHttpMessages } from 'cypress/types/net-stubbing'
import type { CypressCommand } from '../types'

const interceptGraphQL = (
  interceptor: (req: CyHttpMessages.IncomingHttpRequest) => void,
) => {
  cy.intercept('POST', '/api/graphql', interceptor)
}

const waitForApiCalls = () => {
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
  body: string | Record<string, any>,
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

export interface CypressGraphQLHelpersCommands {
  interceptGraphQL: typeof interceptGraphQL
  graphqlRequest: typeof graphqlRequest
  waitForApiCalls: typeof waitForApiCalls
}

export const graphQLCommands: Array<CypressCommand> = [
  { fn: interceptGraphQL, name: 'interceptGraphQL' },
  { fn: graphqlRequest, name: 'graphqlRequest' },
  { fn: waitForApiCalls, name: 'waitForApiCalls' },
]
