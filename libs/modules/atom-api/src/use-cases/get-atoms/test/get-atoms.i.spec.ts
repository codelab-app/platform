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
  GetAtomsGql,
  GetAtomsQuery,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { AtomModule } from '../../../atom.module'
import { createAtomInput } from '../../create-atom/test/create-atom.data'

describe('GetAtoms', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let atom: __AtomFragment

  beforeAll(async () => {
    guestApp = await setupTestModule([AtomModule], { role: Role.GUEST })
    userApp = await setupTestModule([AtomModule], { role: Role.USER })

    const results = await domainRequest<CreateAtomInput, CreateAtomMutation>(
      userApp,
      CreateAtomGql,
      createAtomInput,
    )

    atom = results.createAtom

    expect(atom.id).toBeDefined()
    expect(atom).toMatchObject(createAtomInput)
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to get atoms', async () => {
      await domainRequest(guestApp, GetAtomsGql, undefined, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get atoms', async () => {
      const results = await domainRequest<any, GetAtomsQuery>(
        userApp,
        GetAtomsGql,
      )

      expect(results?.atoms).toMatchObject([atom])
    })
  })
})
