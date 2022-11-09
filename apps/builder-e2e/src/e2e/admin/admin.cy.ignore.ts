// import { exportAndAssert, importData, seedData } from './assert'

// const insertDummy

// describe('Admin', () => {
//   before(() => {
//     cy.resetDatabase().then(() => {
//       // to create new user
//       cy.login()
//       cy.visit('/types')
//     })
//   })

//   /**
//    * Used to compare future payload to see diff
//    */
//   let initialPayload = {}
//   /**
//    * Can be used as parameter into `exportAndAssert` to see output as file
//    */

//   describe('seed', () => {
//     it('should seed Ant Design CSV data & export', () => {
//       // seedData()
//       exportAndAssert().then((payload) => {
//         initialPayload = payload
//       })
//     })

//     it('should be able to seed twice without changing the database', () => {
//       seedData()

//       return exportAndAssert().then((payload) => {
//         expect(payload).toEqual(initialPayload)
//       })
//     })

//     /**
//      * Importing from file should result in the same data as seed
//      */
//     // it('should import Ant Design data', () => {
//     //   cy.resetDatabase()

//     //   importData()

//     //   return exportAndAssert().then((payload) => {
//     //     expect(payload).toEqual(initialPayload)
//     //   })
//     // })

//     // it('should import data twice without changing the database', () => {
//     //   importData()

//     //   return exportAndAssert().then((payload) => {
//     //     expect(payload).toEqual(initialPayload)
//     //   })
//     // })
//   })
// })
