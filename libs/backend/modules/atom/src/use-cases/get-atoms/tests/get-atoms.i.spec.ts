import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { AtomModule } from '../../../atom.module'
import { CreateAtomInput } from '../../create-atom'
import {
  TestCreateAtomGql,
  TestCreateAtomMutation,
} from '../../create-atom/tests/create-atom.api.graphql.gen'
import {
  createAtomBInput,
  createAtomInput,
} from '../../create-atom/tests/create-atom.data'
import { GetAtomsInput } from '../get-atoms.input'
import { TestGetAtomsGql, TestGetAtomsQuery } from './get-atoms.api.graphql.gen'

describe('GetAtoms', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let adminApp: INestApplication
  let atomAId: string
  let atomBId: string

  beforeAll(async () => {
    guestApp = await setupTestModule([AtomModule], { role: Role.Guest })
    userApp = await setupTestModule([AtomModule], { role: Role.User })
    adminApp = await setupTestModule([AtomModule], { role: Role.Admin })

    const { createAtom: atomA } = await domainRequest<
      CreateAtomInput,
      TestCreateAtomMutation
    >(adminApp, TestCreateAtomGql, createAtomInput)

    const { createAtom: atomB } = await domainRequest<
      CreateAtomInput,
      TestCreateAtomMutation
    >(adminApp, TestCreateAtomGql, createAtomBInput)

    atomAId = atomA.id
    atomBId = atomB.id

    expect(atomAId).toBeDefined()
    expect(atomBId).toBeDefined()
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
    await teardownTestModule(adminApp)
  })

  describe('Guest', () => {
    it('should fail to get atoms', async () => {
      await domainRequest<GetAtomsInput, TestGetAtomsQuery>(
        guestApp,
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
        userApp,
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
      >(userApp, TestGetAtomsGql, {
        where: { ids: [atomAId] },
      })

      expect(getAtoms).toMatchObject([{ ...createAtomInput, id: atomAId }])
    })
  })
})
