import { loginSession } from '../../support/nextjs-auth0/commands/login'
import { exportAndAssert, importData, seedData } from './assert'

describe('Admin', () => {
  before(() => {
    cy.resetDatabase()
    loginSession()
  })

  /**
   * Used to compare future payload to see diff
   */
  let initialPayload = {}

  /**
   * Can be used as parameter into `exportAndAssert` to see output as file
   */
  const createSeedDataPath = (index: number) =>
    `./src/data/seed-data-${index}.test.json`

  describe('seed', () => {
    it('should seed Ant Design CSV data & export', () => {
      seedData()
      exportAndAssert().then((payload) => {
        initialPayload = payload
      })
    })

    it('should be able to seed twice without changing the database', () => {
      seedData()

      return exportAndAssert(createSeedDataPath(1)).then((payload) => {
        // Uncomment to see detailed diff
        // for (let i = 0; i < payload.tags.length; i++) {
        //   const payloadTag = payload.tags[i]
        //   const initialPayloadTag = initialPayload.tags[i]
        //   expect(payloadTag).toEqual(initialPayloadTag)
        // }
        expect(payload).toEqual(initialPayload)
      })
    })

    /**
     * Importing from file should result in the same data as seed
     */
    it('should import Ant Design data', () => {
      cy.logout()
      cy.resetDatabase()
      loginSession()
      importData()

      return exportAndAssert(createSeedDataPath(2)).then((payload) => {
        expect(payload).toEqual(initialPayload)
      })
    })

    it('should import data twice without changing the database', () => {
      importData()

      return exportAndAssert(createSeedDataPath(3)).then((payload) => {
        expect(payload).toEqual(initialPayload)
      })
    })
  })
})
