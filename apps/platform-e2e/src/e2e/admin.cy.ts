import { loginAndSetupData } from '@codelab/frontend/test/cypress/nextjs-auth0'
import type { IUserDto } from '@codelab/shared/abstract/core'
import path from 'path'

describe.skip('Admin', () => {
  let user: IUserDto

  before(() => {
    loginAndSetupData()
    cy.getCurrentUser().then((results) => {
      user = results
    })
  })

  it('should import user data', () => {
    const downloadPath = Cypress.config('downloadsFolder')
    const cypressDataExportPath = path.resolve(downloadPath, 'export')

    const originalDataExportPath = path.resolve(
      Cypress.env('workspaceRoot'),
      'data/export',
    )

    const TIMEOUT = 60000

    cy.request({
      body: {
        email: user.email,
        includeAdminData: true,
      },
      method: 'POST',
      timeout: TIMEOUT,
      url: '/api/data/admin/import',
    })

    cy.request({
      body: {
        adminDataPath: cypressDataExportPath,
        includeAdminData: true,
      },
      method: 'POST',
      timeout: TIMEOUT,
      url: '/api/data/admin/export',
    }).as('export')

    cy.task(
      'areDirectoriesIdentical',
      {
        dir1: cypressDataExportPath,
        dir2: originalDataExportPath,
      },
      { timeout: 20000 },
    ).then((same) => {
      cy.wrap(same).should('eq', true)
    })
  })
})
