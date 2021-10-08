import { domainRequest } from '@codelab/backend/shared/testing'
import { setupAtomTestModule } from '../../../test/setupAtomTestModule'
import { createAtomInput } from '../../create-atom/tests/create-atom.data'
import { GetAtomInput } from '../get-atom.input'
import { TestGetAtomGql } from './get-atom.api.graphql.gen'

describe('GetAtom', () => {
  const testModule = setupAtomTestModule(true)
  let atomId: string
  let getAtomInput: GetAtomInput
  let getAtomByTypeInput: GetAtomInput

  beforeAll(async () => {
    const atom = await testModule.createTestAtom(createAtomInput)

    atomId = atom.id
    getAtomInput = {
      where: { id: atomId },
    }

    getAtomByTypeInput = {
      where: { type: createAtomInput.type },
    }
  })

  describe('Guest', () => {
    it('should fail to get atom', async () => {
      await domainRequest(testModule.guestApp, TestGetAtomGql, getAtomInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get an atom ', async () => {
      const atom = await testModule.getAtom(getAtomInput)

      expect(atom).toMatchObject({
        id: atomId,
        name: 'Button (Ant Design)',
        type: 'AntDesignButton',
      })
    })

    it('should get an atom by type', async () => {
      const atom = await testModule.getAtom(getAtomByTypeInput)

      expect(atom).toMatchObject({
        id: atomId,
        name: 'Button (Ant Design)',
        type: 'AntDesignButton',
      })
    })
  })
})
