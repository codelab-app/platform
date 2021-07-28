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
  let atom: __AtomFragment
  let getAtomInput: GetAtomInput

  beforeAll(async () => {
    guestApp = await setupTestModule([AtomModule], { role: Role.GUEST })
    userApp = await setupTestModule([AtomModule], { role: Role.USER })

    const results = await domainRequest<CreateAtomInput, CreateAtomMutation>(
      userApp,
      CreateAtomGql,
      createAtomInput,
    )

    atom = results.createAtom
    getAtomInput = {
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
    it('should fail to get an atom', async () => {
      await domainRequest(guestApp, GetAtomGql, getAtomInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get an atom', async () => {
      const results = await domainRequest<GetAtomInput, GetAtomQuery>(
        userApp,
        GetAtomGql,
        getAtomInput,
      )

      expect(results?.atom).toMatchObject(atom)
    })
  })
})
