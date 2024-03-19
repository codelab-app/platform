import type { CyHttpMessages, WaitOptions } from 'cypress/types/net-stubbing'
import { v4 } from 'uuid'

/**
 * Dynamic alias wait has some issues, since alias value is a primitive it is copied
 *
 * https://github.com/cypress-io/cypress/issues/16321
 * https://github.com/cypress-io/cypress-documentation/issues/1573
 */
export const waitForApiCalls = (
  callback: () => Cypress.Chainable | void,
  options?: Partial<WaitOptions>,
) => {
  Cypress.log({
    name: 'wait for api calls',
  })

  const queryName = 'graphqlQueries'

  cy.intercept('/api/*').as(queryName)

  callback()

  cy.get(`@${queryName}.all`, { timeout: 15000, ...options })
}

export const GRAPHQL_REQUEST_ID = 'GraphqlRequest'

export const graphqlRequest = (
  body: Record<string, any> | string,
  alias = GRAPHQL_REQUEST_ID,
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
