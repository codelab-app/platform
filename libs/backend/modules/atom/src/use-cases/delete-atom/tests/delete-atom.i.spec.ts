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
  CreateAtomGql,
  CreateAtomMutation,
} from '../../create-atom/tests/create-atom.api.graphql'
import { createAtomInput } from '../../create-atom/tests/create-atom.data'
import { GetAtomInput } from '../../get-atom/get-atom.input'
import {
  GetAtomGql,
  GetAtomQuery,
} from '../../get-atom/tests/get-atom.api.graphql'
import { DeleteAtomInput } from '../delete-atom.input'
import { DeleteAtomGql, DeleteAtomMutation } from './delete-atom.api.graphql'

describe('DeleteAtom', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let atomId: string
  let deleteAtomInput: DeleteAtomInput
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
      await domainRequest(guestApp, DeleteAtomGql, deleteAtomInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should delete an atom', async () => {
      await domainRequest<DeleteAtomInput, DeleteAtomMutation>(
        userApp,
        DeleteAtomGql,
        deleteAtomInput,
      )

      // Should fail to get the deleted atom
      const { getAtom } = await domainRequest<GetAtomInput, GetAtomQuery>(
        userApp,
        GetAtomGql,
        getAtomInput,
      )

      expect(getAtom).toBeNull()
    })

    // TODO: Add delete atom spec
    test.todo('should remove all associated types, if not used by other atoms')
  })
})
