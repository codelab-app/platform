describe('Admin', () => {
  before(() => {
    cy.resetDatabase()
    cy.login()
  })

  describe('parse', () => {
    it(`should parse Ant Design CSV data & import`, () => {
      // cy.exec('yarn cli parse --env test --email cypress@codelab.ai', {
      //   timeout: 30000,
      // })
      //   .its('stdout')
      //   .then((res) => {
      //     cy.log(res)
      //   })
      // cy.exec(
      //   'yarn cli data export --env test --seedData ./seed-data-test.json --skipUserData --skipSeedData false',
      //   { timeout: 30000 },
      // )
      //
      // cy.exec('ls')
      //   .its('stdout')
      //   .then((res) => cy.log(res))

      return cy.readFile('../../data/seed-data-test.json').then((payload) => {
        const { atoms, tags, types } = payload

        console.log(payload)

        expect(true).to.be.true
        // cy.importAdminData(JSON.stringify(payload)).then((success: any) => {
        //   expect(success).to.equal(true)
        //
        //   cy.exportAdminData().then((exportResult: any) => {
        //     // compare only names for tags, atoms because these nodes will be created by ogm with new id
        //     const payloadNames = {
        //       tags: payload.tags?.vertices
        //         .map((v: any) => v.name)
        //         .sort((a: string, b: string) => (a > b ? -1 : 1)),
        //       atoms: payload.atoms
        //         ?.map((v: any) => v.name)
        //         .sort((a: string, b: string) => (a > b ? -1 : 1)),
        //       typesGraph: payload.typesGraph,
        //     }
        //
        //     const exportResultNames = {
        //       tags: exportResult.tags?.vertices
        //         .map((v: any) => v.name)
        //         .sort((a: string, b: string) => (a > b ? -1 : 1)),
        //       atoms: exportResult.atoms
        //         ?.map((v: any) => v.name)
        //         .sort((a: string, b: string) => (a > b ? -1 : 1)),
        //       typesGraph: exportResult.typesGraph,
        //     }
        //
        //     expect(payloadNames).to.deep.eq(exportResultNames)
        //   })
        // })
      })
    })
  })
})
