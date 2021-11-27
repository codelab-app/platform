import { domainRequest } from '@codelab/backend/shared/testing'
import { setupAtomTestModule } from '../../../test/setupAtomTestModule'
import { createAtomInput } from '../../create-atom/tests/create-atom.data'
import { GetAtomInput } from '../../get-atom/get-atom.input'
import { DeleteAtomInput } from '../delete-atom.input'
import {
  TestDeleteAtomGql,
  TestDeleteAtomMutation,
} from './delete-atom.api.graphql.gen'

describe('DeleteAtom', () => {
  const testModule = setupAtomTestModule(true)
  let atomId: string
  let deleteAtomInput: DeleteAtomInput
  let getAtomInput: GetAtomInput

  beforeAll(async () => {
    const atom = await testModule.createTestAtom(createAtomInput)

    atomId = atom.id
    deleteAtomInput = {
      atomId: atomId,
    }
    getAtomInput = {
      where: { id: atomId },
    }

    expect(atomId).toBeDefined()
  })

  describe('Guest', () => {
    it('should fail to delete an atom', async () => {
      await domainRequest(
        testModule.guestApp,
        TestDeleteAtomGql,
        deleteAtomInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should fail to delete an atom', async () => {
      await domainRequest(
        testModule.userApp,
        TestDeleteAtomGql,
        deleteAtomInput,
        {
          message: 'Admin access only',
        },
      )
    })
  })

  describe('Admin', () => {
    it('should delete an atom', async () => {
      await domainRequest<DeleteAtomInput, TestDeleteAtomMutation>(
        testModule.adminApp,
        TestDeleteAtomGql,
        deleteAtomInput,
      )

      // Should fail to get the deleted atom
      const atom = await testModule.getAtom(getAtomInput)

      expect(atom).toBeNull()
    })

    // TODO: Add delete atom spec
    test.todo('should remove all associated types, if not used by other atoms')
  })
})
