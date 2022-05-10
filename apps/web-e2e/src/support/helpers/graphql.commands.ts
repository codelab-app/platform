import { CyHttpMessages } from 'cypress/types/net-stubbing'
import { CypressCommand } from '../types'

const interceptGraphQL = (
  interceptor: (req: CyHttpMessages.IncomingHttpRequest) => void,
) => {
  cy.intercept('POST', '/api/graphql', interceptor)
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

export const graphqlRequest = (
  body: string | Record<string, any>,
  config?: any,
) =>
  cy.request({
    method: 'POST',
    url: '/api/graphql',
    body,
    ...config,
  })

export interface CypressGraphQLHelpersCommands {
  interceptGraphQL: typeof interceptGraphQL
  graphqlRequest: typeof graphqlRequest
}

export const graphQLCommands: Array<CypressCommand> = [
  { name: 'interceptGraphQL', fn: interceptGraphQL },
  { name: 'graphqlRequest', fn: graphqlRequest },
]
