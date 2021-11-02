import { domainRequest } from '@codelab/backend/shared/testing'
import { AtomType } from '@codelab/shared/abstract/core'
import { setupAtomTestModule } from '../../../test/setupAtomTestModule'
import { createAtomInput } from '../../create-atom/tests/create-atom.data'
import { UpdateAtomInput } from '../update-atom.input'
import {
  TestUpdateAtomGql,
  TestUpdateAtomMutation,
} from './update-atom.api.graphql.gen'

describe('UpdateAtom', () => {
  const testModule = setupAtomTestModule(false)
  let atomId: string
  let updateAtomInput: UpdateAtomInput

  beforeAll(async () => {
    const createAtom = await testModule.createTestAtom(createAtomInput)

    atomId = createAtom.id
    updateAtomInput = {
      id: atomId,
      data: {
        name: 'Button updated (Ant Design)',
        type: AtomType.AntDesignButton,
      },
    }

    expect(atomId).toBeDefined()
  })

  describe('Guest', () => {
    it('should fail to update an atom', async () => {
      await domainRequest(
        testModule.guestApp,
        TestUpdateAtomGql,
        updateAtomInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should fail to update an atom', async () => {
      await domainRequest(
        testModule.userApp,
        TestUpdateAtomGql,
        updateAtomInput,
        {
          message: 'Admin access only',
        },
      )
    })
  })

  describe('Admin', () => {
    it('should update an atom', async () => {
      const { updateAtom } = await domainRequest<
        UpdateAtomInput,
        TestUpdateAtomMutation
      >(testModule.adminApp, TestUpdateAtomGql, updateAtomInput)

      expect(updateAtom).toBeDefined()

      expect(updateAtom).toMatchObject({
        ...updateAtomInput.data,
        id: updateAtomInput.id,
      })
    })
  })
})
