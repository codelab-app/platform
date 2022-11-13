import { IRole } from '@codelab/shared/abstract/core'
import { exportAndAssert, importData, seedData } from './assert'

// data's correctness doesn't matter here
// just need user with test email to exist
const createCypressUser = () =>
  cy.createUser({
    input: {
      auth0Id: 'test2',
      email: 'cypress@codelab.app',
      username: 'cypress@codelab.app',
      roles: [IRole.Admin, IRole.User],
    },
  })

describe('Admin', () => {
  before(() => {
    cy.resetDatabase()
    createCypressUser()
  })

  /**
   * Used to compare future payload to see diff
   */
  let initialPayload = {}
  /**
   * Can be used as parameter into `exportAndAssert` to see output as file
   */

  describe('seed', () => {
    it('should seed Ant Design CSV data & export', () => {
      seedData()
      exportAndAssert().then((payload) => {
        initialPayload = payload
      })
    })

    it('should be able to seed twice without changing the database', () => {
      seedData()

      return exportAndAssert().then((payload) => {
        expect(payload).toEqual(initialPayload)
      })
    })

    /**
     * Importing from file should result in the same data as seed
     */
    it('should import Ant Design data', () => {
      cy.resetDatabase()
      createCypressUser()
      importData()

      return exportAndAssert().then((payload) => {
        expect(payload).toEqual(initialPayload)
      })
    })

    it('should import data twice without changing the database', () => {
      importData()

      return exportAndAssert().then((payload) => {
        expect(payload).toEqual(initialPayload)
      })
    })
  })
})
