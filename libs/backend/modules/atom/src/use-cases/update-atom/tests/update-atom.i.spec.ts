import { domainRequest } from '@codelab/backend/infra'
import { setupTestModule, teardownTestModule } from '@codelab/backend/nestjs'
import { AtomType, Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { AtomModule } from '../../../atom.module'
import { CreateAtomInput } from '../../create-atom'
import {
  TestCreateAtomGql,
  TestCreateAtomMutation,
} from '../../create-atom/tests/create-atom.api.graphql.gen'
import { createAtomInput } from '../../create-atom/tests/create-atom.data'
import { GetAtomInput } from '../../get-atom/get-atom.input'
import {
  TestGetAtomGql,
  TestGetAtomQuery,
} from '../../get-atom/tests/get-atom.api.graphql.gen'
import { UpdateAtomInput } from '../update-atom.input'
import {
  TestUpdateAtomGql,
  TestUpdateAtomMutation,
} from './update-atom.api.graphql.gen'

describe('UpdateAtom', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let adminApp: INestApplication
  let atomId: string
  let updateAtomInput: UpdateAtomInput
  let getAtomInput: GetAtomInput

  beforeAll(async () => {
    guestApp = await setupTestModule([AtomModule], { role: Role.Guest })
    userApp = await setupTestModule([AtomModule], { role: Role.User })
    adminApp = await setupTestModule([AtomModule], { role: Role.Admin })

    const results = await domainRequest<
      CreateAtomInput,
      TestCreateAtomMutation
    >(adminApp, TestCreateAtomGql, createAtomInput)

    atomId = results.createAtom.id
    updateAtomInput = {
      id: atomId,
      data: {
        name: 'Button updated (Ant Design)',
        type: AtomType.AntDesignButton,
      },
    }

    getAtomInput = { where: { id: atomId } }

    expect(atomId).toBeDefined()
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
    await teardownTestModule(adminApp)
  })

  describe('Guest', () => {
    it('should fail to update an atom', async () => {
      await domainRequest(guestApp, TestUpdateAtomGql, updateAtomInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should fail to update an atom', async () => {
      await domainRequest(userApp, TestUpdateAtomGql, updateAtomInput, {
        message: 'Admin access only',
      })
    })
  })

  describe('Admin', () => {
    it('should update an atom', async () => {
      await domainRequest<UpdateAtomInput, TestUpdateAtomMutation>(
        adminApp,
        TestUpdateAtomGql,
        updateAtomInput,
      )

      const { atom } = await domainRequest<GetAtomInput, TestGetAtomQuery>(
        userApp,
        TestGetAtomGql,
        getAtomInput,
      )

      expect(atom).toMatchObject({
        ...updateAtomInput.data,
        id: updateAtomInput.id,
      })
    })
  })
})
