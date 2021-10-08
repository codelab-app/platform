import { domainRequest } from '@codelab/backend/shared/testing'
import { setupAtomTestModule } from '../../../test/setupAtomTestModule'
import {
  createAtomBInput,
  createAtomInput,
} from '../../create-atom/tests/create-atom.data'
import { GetAtomsInput } from '../get-atoms.input'
import { TestGetAtomsGql, TestGetAtomsQuery } from './get-atoms.api.graphql.gen'

describe('GetAtoms', () => {
  const testModule = setupAtomTestModule(true)
  let atomAId: string
  let atomBId: string

  beforeAll(async () => {
    const atomA = await testModule.createTestAtom(createAtomInput)
    const atomB = await testModule.createTestAtom(createAtomBInput)

    atomAId = atomA.id
    atomBId = atomB.id

    expect(atomAId).toBeDefined()
    expect(atomBId).toBeDefined()
  })

  describe('Guest', () => {
    it('should fail to get atoms', async () => {
      await domainRequest<GetAtomsInput, TestGetAtomsQuery>(
        testModule.guestApp,
        TestGetAtomsGql,
        {},
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should get atoms', async () => {
      const results = await domainRequest<GetAtomsInput, TestGetAtomsQuery>(
        testModule.userApp,
        TestGetAtomsGql,
        {},
      )

      expect(results?.getAtoms).toMatchObject([
        { ...createAtomInput, id: atomAId },
        { ...createAtomBInput, id: atomBId },
      ])
    })

    it('should get atoms where', async () => {
      const { getAtoms } = await domainRequest<
        GetAtomsInput,
        TestGetAtomsQuery
      >(testModule.userApp, TestGetAtomsGql, {
        where: { ids: [atomAId] },
      })

      expect(getAtoms).toMatchObject([{ ...createAtomInput, id: atomAId }])
    })
  })
})
