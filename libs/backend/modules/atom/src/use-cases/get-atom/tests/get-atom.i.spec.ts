import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { INestApplication } from '@nestjs/common'
import { AtomModule } from '../../../atom.module'
import { CreateAtomInput } from '../../create-atom'
import {
  CreateAtomGql,
  CreateAtomMutation,
} from '../../create-atom/tests/create-atom.api.graphql'
import { createAtomInput } from '../../create-atom/tests/create-atom.data'
import { GetAtomInput } from '../get-atom.input'
import { GetAtomGql, GetAtomQuery } from './get-atom.api.graphql'

describe('GetAtom', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let atomId: string
  let getAtomInput: GetAtomInput
  let getAtomByTypeInput: GetAtomInput

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
      where: { id: atomId },
    }

    getAtomByTypeInput = {
      where: { type: createAtomInput.type },
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
      const { getAtom } = await domainRequest<GetAtomInput, GetAtomQuery>(
        userApp,
        GetAtomGql,
        getAtomInput,
      )

      expect(getAtom).toMatchObject({
        id: atomId,
        name: 'Button (Ant Design)',
        type: 'AntDesignButton',
      })
    })

    it('should get an atom by type', async () => {
      const { getAtom } = await domainRequest<GetAtomInput, GetAtomQuery>(
        userApp,
        GetAtomGql,
        getAtomByTypeInput,
      )

      expect(getAtom).toMatchObject({
        id: atomId,
        name: 'Button (Ant Design)',
        type: 'AntDesignButton',
      })
    })
  })
})
