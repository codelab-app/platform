import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  CreateAtomGql,
  CreateAtomInput,
  CreateAtomMutation,
  GetAtomGql,
  GetAtomInput,
  GetAtomQuery,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { AtomModule } from '../../../atom.module'
import { createAtomInput } from './create-atom.data'

describe('CreateAtom', () => {
  let guestApp: INestApplication
  let userApp: INestApplication

  beforeAll(async () => {
    guestApp = await setupTestModule([AtomModule], { role: Role.GUEST })
    userApp = await setupTestModule([AtomModule], { role: Role.USER })
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create an atom', async () => {
      await domainRequest(guestApp, CreateAtomGql, createAtomInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should create an atom', async () => {
      const {
        createAtom: { id: atomId },
      } = await domainRequest<CreateAtomInput, CreateAtomMutation>(
        userApp,
        CreateAtomGql,
        createAtomInput,
      )

      const { atom } = await domainRequest<GetAtomInput, GetAtomQuery>(
        userApp,
        GetAtomGql,
        { byId: { atomId } },
      )

      expect(atomId).toBeDefined()
      expect(atom).toMatchObject({ id: atomId, ...createAtomInput })

      expect(atom?.api).toBeDefined()
      expect(atom?.api.name).toBeDefined()
      expect(atom?.api.id).toBeDefined()
    })
  })
})
