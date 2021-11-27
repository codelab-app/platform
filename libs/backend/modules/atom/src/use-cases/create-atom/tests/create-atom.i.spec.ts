import { domainRequest } from '@codelab/backend/shared/testing'
import { setupAtomTestModule } from '../../../test/setupAtomTestModule'
import { TestCreateAtomGql } from './create-atom.api.graphql.gen'
import { createAtomInput } from './create-atom.data'

describe('CreateAtom', () => {
  const testModule = setupAtomTestModule(true)

  describe('Guest', () => {
    it('should fail to create an atom', async () => {
      await domainRequest(
        testModule.guestApp,
        TestCreateAtomGql,
        createAtomInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should fail to create an atom', async () => {
      await domainRequest(
        testModule.userApp,
        TestCreateAtomGql,
        createAtomInput,
        {
          message: 'Admin access only',
        },
      )
    })
  })

  describe('Admin', () => {
    it('should create an atom', async () => {
      const atom = await testModule.createTestAtom(createAtomInput)

      expect(atom).toMatchObject({
        id: atom.id,
        ...createAtomInput,
      })
    })
  })
})
