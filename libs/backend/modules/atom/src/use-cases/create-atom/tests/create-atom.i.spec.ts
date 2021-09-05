import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { INestApplication } from '@nestjs/common'
import { AtomModule } from '../../../atom.module'
import { GetAtomInput } from '../../get-atom/get-atom.input'
import {
  TestGetAtomGql,
  TestGetAtomQuery,
} from '../../get-atom/tests/get-atom.api.graphql.gen'
import { CreateAtomInput } from '../create-atom.input'
import {
  TestCreateAtomGql,
  TestCreateAtomMutation,
} from './create-atom.api.graphql.gen'
import { createAtomInput } from './create-atom.data'

describe('CreateAtom', () => {
  let guestApp: INestApplication
  let userApp: INestApplication

  beforeAll(async () => {
    guestApp = await setupTestModule([AtomModule], { role: Role.Guest })
    userApp = await setupTestModule([AtomModule], { role: Role.User })
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create an atom', async () => {
      await domainRequest(guestApp, TestCreateAtomGql, createAtomInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should create an atom', async () => {
      const {
        createAtom: { id: atomId },
      } = await domainRequest<CreateAtomInput, TestCreateAtomMutation>(
        userApp,
        TestCreateAtomGql,
        createAtomInput,
      )

      const { atom } = await domainRequest<GetAtomInput, TestGetAtomQuery>(
        userApp,
        TestGetAtomGql,
        { where: { id: atomId } },
      )

      expect(atom).toMatchObject({ id: atomId, ...createAtomInput })
    })
  })
})
