import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import {
  CreateAtomGql,
  CreateAtomInput,
  CreateAtomMutation,
  GetAtomsGql,
  GetAtomsInput,
  GetAtomsQuery,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { AtomModule } from '../../../atom.module'
import {
  createAtomBInput,
  createAtomInput,
} from '../../create-atom/tests/create-atom.data'

describe('GetAtoms', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let atomAId: string
  let atomBId: string

  beforeAll(async () => {
    guestApp = await setupTestModule([AtomModule], { role: Role.GUEST })
    userApp = await setupTestModule([AtomModule], { role: Role.USER })

    const { createAtom: atomA } = await domainRequest<
      CreateAtomInput,
      CreateAtomMutation
    >(userApp, CreateAtomGql, createAtomInput)

    const { createAtom: atomB } = await domainRequest<
      CreateAtomInput,
      CreateAtomMutation
    >(userApp, CreateAtomGql, createAtomBInput)

    atomAId = atomA.id
    atomBId = atomB.id

    expect(atomAId).toBeDefined()
    expect(atomBId).toBeDefined()
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to get atoms', async () => {
      await domainRequest<GetAtomsInput, GetAtomsQuery>(
        guestApp,
        GetAtomsGql,
        {},
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should get atoms', async () => {
      const results = await domainRequest<GetAtomsInput, GetAtomsQuery>(
        userApp,
        GetAtomsGql,
        {},
      )

      expect(results?.atoms).toMatchObject([
        { ...createAtomInput, id: atomAId },
        { ...createAtomBInput, id: atomBId },
      ])
    })

    it('should get atoms where', async () => {
      const { atoms } = await domainRequest<GetAtomsInput, GetAtomsQuery>(
        userApp,
        GetAtomsGql,
        {
          where: { ids: [atomAId] },
        },
      )

      expect(atoms).toMatchObject([{ ...createAtomInput, id: atomAId }])
    })
  })
})
