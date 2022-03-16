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
