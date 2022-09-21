import { appName } from './apps/app.data'

describe.skip('Admin', () => {
  before(() => {
    cy.resetDatabase()
    cy.login()
  })

  describe('parse', () => {
    it(`should parse Ant Design CSV data & import`, () => {
      cy.findAllByText(appName, { exact: true, timeout: 0 }).should('not.exist')
      cy.exec('yarn cli parse --env test --email cypress@codelab.ai', {
        timeout: 30000,
      })
      // cy.exec(
      //   'yarn cli data export --env test --seedData ./data/seed-data-test.json',
      //   { timeout: 30000 },
      // )

      // cy.readFile('./src/data/import-data.json').then((payload) => {
      //   cy.importAdminData(JSON.stringify(payload)).then((success: any) => {
      //     expect(success).to.equal(true)
      //
      //     cy.exportAdminData().then((exportResult: any) => {
      //       // compare only names for tags, atoms because these nodes will be created by ogm with new id
      //       const payloadNames = {
      //         tags: payload.tags?.vertices
      //           .map((v: any) => v.name)
      //           .sort((a: string, b: string) => (a > b ? -1 : 1)),
      //         atoms: payload.atoms
      //           ?.map((v: any) => v.name)
      //           .sort((a: string, b: string) => (a > b ? -1 : 1)),
      //         typesGraph: payload.typesGraph,
      //       }
      //
      //       const exportResultNames = {
      //         tags: exportResult.tags?.vertices
      //           .map((v: any) => v.name)
      //           .sort((a: string, b: string) => (a > b ? -1 : 1)),
      //         atoms: exportResult.atoms
      //           ?.map((v: any) => v.name)
      //           .sort((a: string, b: string) => (a > b ? -1 : 1)),
      //         typesGraph: exportResult.typesGraph,
      //       }
      //
      //       expect(payloadNames).to.deep.eq(exportResultNames)
      //     })
      //   })
      // })
    })
  })
})
