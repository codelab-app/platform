import type { CyHttpMessages, WaitOptions } from 'cypress/types/net-stubbing'
import { v4 } from 'uuid'

export const waitForApiCalls = (
  callback: () => Cypress.Chainable | void,
  options?: Partial<WaitOptions>,
) => {
  Cypress.log({
    name: 'wait for api calls',
  })

  const queryName = `graphqlQueries-${v4()}`

  cy.intercept('/api/*').as(queryName)

  callback()

  cy.wait(`@${queryName}`, { ...options })
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
