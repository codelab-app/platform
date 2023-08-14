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
    cy.request({
      body: {
        email: user.email,
        includeAdminData: true,
      },
      method: 'POST',
      timeout: 120000,
      url: '/api/data/migration/import',
    }).as('import')

    // cy.request({
    //   body: {
    //     adminDataPath: path.resolve('tmp'),
    //     includeAdminData: true,
    //   },
    //   method: 'POST',
    //   timeout: 30000,
    //   url: '/api/data/migration/export',
    // }).as('export')

    // cy.get('@export')
  })
})
