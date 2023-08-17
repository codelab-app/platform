import type { IUserDTO } from '@codelab/shared/abstract/core'
import { loginSession } from '@codelab/testing/cypress/nextjs-auth0'
import path from 'path'

describe('Admin', () => {
  let user: IUserDTO

  before(() => {
    cy.resetDatabase()
    loginSession()
    cy.getCurrentUser().then((results) => {
      user = results
    })
  })

  it('should import user data', () => {
    cy.intercept({
      method: 'POST',
      url: '**/api/data/migration/import',
    }).as('import')

    const TIMEOUT = 120000

    cy.request({
      body: {
        email: user.email,
        includeAdminData: true,
      },
      method: 'POST',
      timeout: TIMEOUT,
      url: '/api/data/migration/import',
    })

    cy.wait('@import', { timeout: TIMEOUT })

    cy.request({
      body: {
        adminDataPath: path.resolve('tmp/cypress'),
        includeAdminData: true,
      },
      method: 'POST',
      timeout: TIMEOUT,
      url: '/api/data/migration/export',
    }).as('export')

    // cy.get('@export')
  })
})
