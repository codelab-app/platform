describe('Admin Import and Export', () => {
  before(() => {
    cy.resetDatabase().then(() => {
      cy.login()
    })
  })

  describe(`import and export`, () => {
    it(`should be able to import and export`, () => {
      cy.readFile('./src/data/import-data.json').then((payload) => {
        cy.importAdminData(JSON.stringify(payload)).then((success: any) => {
          expect(success).to.equal(true)

          cy.exportAdminData().then((exportResult: any) => {
            // compare only names for tags, atoms because these nodes will be created by ogm with new id
            const payloadNames = {
              tags: payload.tags?.vertices
                .map((v: any) => v.name)
                .sort((a: string, b: string) => (a > b ? -1 : 1)),
              atoms: payload.atoms
                ?.map((v: any) => v.name)
                .sort((a: string, b: string) => (a > b ? -1 : 1)),
              typesGraph: payload.typesGraph,
            }

            const exportResultNames = {
              tags: exportResult.tags?.vertices
                .map((v: any) => v.name)
                .sort((a: string, b: string) => (a > b ? -1 : 1)),
              atoms: exportResult.atoms
                ?.map((v: any) => v.name)
                .sort((a: string, b: string) => (a > b ? -1 : 1)),
              typesGraph: exportResult.typesGraph,
            }

            expect(payloadNames).to.deep.eq(exportResultNames)
          })
        })
      })
    })
  })
})
