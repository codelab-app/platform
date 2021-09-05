import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { INestApplication } from '@nestjs/common'
import { AtomModule } from '../../../atom.module'
import { CreateAtomInput } from '../../create-atom/create-atom.input'
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
import { DeleteAtomInput } from '../delete-atom.input'
import {
  TestDeleteAtomGql,
  TestDeleteAtomMutation,
} from './delete-atom.api.graphql.gen'

describe('DeleteAtom', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let atomId: string
  let deleteAtomInput: DeleteAtomInput
  let getAtomInput: GetAtomInput

  beforeAll(async () => {
    guestApp = await setupTestModule([AtomModule], { role: Role.Guest })
    userApp = await setupTestModule([AtomModule], { role: Role.User })

    const results = await domainRequest<
      CreateAtomInput,
      TestCreateAtomMutation
    >(userApp, TestCreateAtomGql, createAtomInput)

    atomId = results.createAtom.id
    deleteAtomInput = {
      atomId: atomId,
    }
    getAtomInput = {
      where: { id: atomId },
    }

    expect(atomId).toBeDefined()
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to delete an atom', async () => {
      await domainRequest(guestApp, TestDeleteAtomGql, deleteAtomInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should delete an atom', async () => {
      await domainRequest<DeleteAtomInput, TestDeleteAtomMutation>(
        userApp,
        TestDeleteAtomGql,
        deleteAtomInput,
      )

      // Should fail to get the deleted atom
      const { atom } = await domainRequest<GetAtomInput, TestGetAtomQuery>(
        userApp,
        TestGetAtomGql,
        getAtomInput,
      )

      expect(atom).toBeNull()
    })

    // TODO: Add delete atom spec
    test.todo('should remove all associated types, if not used by other atoms')
  })
})
