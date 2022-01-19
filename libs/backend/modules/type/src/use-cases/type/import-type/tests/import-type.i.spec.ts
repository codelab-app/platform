describe('ImportType', () => {
  // const testModule = setupTypeTestModule()

  describe('Guest', () => {
    it.skip('should not import api', async () => {
      // await domainRequest<ImportTypeInput>(
      //   guestApp,
      //   ImportTypeGql,
      //   ImportTypeInput,
      //   {
      //     message: 'Unauthorized',
      //   },
      // )
    })
  })

  // describe('User', () => {
  //   it('should import api', async () => {
  //     await domainRequest<ImportTypeInput>(userApp, ImportTypeGql, ImportTypeInput)
  //
  //     const { getAtom } = await domainRequest<GetAtomInput, GetAtomQuery>(
  //       userApp,
  //       GetAtomGql,
  //       {
  //         where: { type: AtomType.AntDesignButton },
  //       },
  //     )
  //
  //     if (!getAtom) {
  //       throw new Error('Atom not found')
  //     }
  //
  //     const getAtomsInput: GetAtomsInput = {
  //       where: {
  //         ids: [getAtom.id],
  //       },
  //     }
  //
  //     /**
  //      * Check atom exists
  //      */
  //     const { exportAtoms } = await domainRequest<
  //       GetAtomsInput,
  //       ExportAtomsQuery
  //     >(guestApp, ExportAtomsGql, getAtomsInput)
  //
  //     expect(false).toBeTruthy()
  //   })
  // })
})
