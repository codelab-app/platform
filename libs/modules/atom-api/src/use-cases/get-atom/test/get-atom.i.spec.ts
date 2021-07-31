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
import { createAtomInput } from '../../create-atom/test/create-atom.data'

describe('GetAtom', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let atomId: string
  let getAtomInput: GetAtomInput

  beforeAll(async () => {
    guestApp = await setupTestModule([AtomModule], { role: Role.GUEST })
    userApp = await setupTestModule([AtomModule], { role: Role.USER })

    const results = await domainRequest<CreateAtomInput, CreateAtomMutation>(
      userApp,
      CreateAtomGql,
      createAtomInput,
    )

    atomId = results.createAtom.id
    getAtomInput = {
      byId: { atomId },
    }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to get atom', async () => {
      await domainRequest(guestApp, GetAtomGql, getAtomInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get an atom ', async () => {
      const { atom } = await domainRequest<GetAtomInput, GetAtomQuery>(
        userApp,
        GetAtomGql,
        getAtomInput,
      )

      expect(atom).toMatchObject({
        id: atomId,
        name: 'Button (Ant Design)',
        type: 'AntDesignButton',
      })
    })
  })
})
