// import { getEnv } from '@codelab/shared/config'

export const platformApiRequest = (path: string) => {
  return cy.request({
    method: 'POST',
    timeout: 10000,
    url: `${Cypress.env('platformApiHost')}${path}`,
  })
}
