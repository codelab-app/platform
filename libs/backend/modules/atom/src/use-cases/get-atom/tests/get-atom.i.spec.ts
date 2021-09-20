import { domainRequest } from '@codelab/backend/infra'
import { setupTestModule, teardownTestModule } from '@codelab/backend/nestjs'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { AtomModule } from '../../../atom.module'
import { CreateAtomInput } from '../../create-atom'
import {
  TestCreateAtomGql,
  TestCreateAtomMutation,
} from '../../create-atom/tests/create-atom.api.graphql.gen'
import { createAtomInput } from '../../create-atom/tests/create-atom.data'
import { GetAtomInput } from '../get-atom.input'
import { TestGetAtomGql, TestGetAtomQuery } from './get-atom.api.graphql.gen'

describe('GetAtom', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let adminApp: INestApplication
  let atomId: string
  let getAtomInput: GetAtomInput
  let getAtomByTypeInput: GetAtomInput

  beforeAll(async () => {
    guestApp = await setupTestModule([AtomModule], { role: Role.Guest })
    userApp = await setupTestModule([AtomModule], { role: Role.User })
    adminApp = await setupTestModule([AtomModule], { role: Role.Admin })

    const results = await domainRequest<
      CreateAtomInput,
      TestCreateAtomMutation
    >(adminApp, TestCreateAtomGql, createAtomInput)

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
      await domainRequest(guestApp, TestGetAtomGql, getAtomInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get an atom ', async () => {
      const { atom } = await domainRequest<GetAtomInput, TestGetAtomQuery>(
        userApp,
        TestGetAtomGql,
        getAtomInput,
      )

      expect(atom).toMatchObject({
        id: atomId,
        name: 'Button (Ant Design)',
        type: 'AntDesignButton',
      })
    })

    it('should get an atom by type', async () => {
      const { atom } = await domainRequest<GetAtomInput, TestGetAtomQuery>(
        userApp,
        TestGetAtomGql,
        getAtomByTypeInput,
      )

      expect(atom).toMatchObject({
        id: atomId,
        name: 'Button (Ant Design)',
        type: 'AntDesignButton',
      })
    })
  })
})
