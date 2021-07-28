import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  __AtomFragment,
  CreateAtomGql,
  CreateAtomInput,
  CreateAtomMutation,
  DeleteAtomGql,
  DeleteAtomInput,
  DeleteAtomMutation,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { AtomModule } from '../../../atom.module'
import { createAtomInput } from '../../create-atom/test/create-atom.data'

describe('DeleteAtom', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let atom: __AtomFragment
  let deleteAtomInput: DeleteAtomInput

  beforeAll(async () => {
    guestApp = await setupTestModule([AtomModule], { role: Role.GUEST })
    userApp = await setupTestModule([AtomModule], { role: Role.USER })

    const results = await domainRequest<CreateAtomInput, CreateAtomMutation>(
      userApp,
      CreateAtomGql,
      createAtomInput,
    )

    atom = results.createAtom
    deleteAtomInput = {
      atomId: atom.id,
    }

    expect(atom.id).toBeDefined()
    expect(atom).toMatchObject(createAtomInput)
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
      const results = await domainRequest<DeleteAtomInput, DeleteAtomMutation>(
        userApp,
        DeleteAtomGql,
        deleteAtomInput,
      )

      expect(results.deleteAtom).toMatchObject({
        affected: 2,
      })
    })
  })
})
