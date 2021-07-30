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
  DeleteAtomGql,
  DeleteAtomInput,
  DeleteAtomMutation,
  GetAtomGql,
  GetAtomInput,
  GetAtomQuery,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { AtomModule } from '../../../atom.module'
import { createAtomInput } from '../../create-atom/test/create-atom.data'

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
      byId: { atomId },
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
      await domainRequest<GetAtomInput, GetAtomQuery>(
        userApp,
        GetAtomGql,
        getAtomInput,
        { message: 'Not found' },
      )
    })
  })
})
