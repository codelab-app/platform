import { exportAndAssert, importData, seedData } from './assert'

describe.skip('Admin', () => {
  before(() => {
    cy.resetDatabase()
  })

  /**
   * Used to compare future payload to see diff
   */
  let initialPayload = {}

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
    it.skip('should import Ant Design data', () => {
      cy.resetDatabase()

      importData()

      return exportAndAssert('./src/data/seed-data-test-2.json').then(
        (payload) => {
          expect(payload).toEqual(initialPayload)
        },
      )
    })

    // it('should import data twice without changing the database', () => {
    //   importData()
    //
    //   return exportAndAssert().then((payload) => {
    //     expect(payload).toEqual(initialPayload)
    //   })
    // })
  })
})
