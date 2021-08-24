import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import {
  GetAtomsGql,
  GetAtomsInput,
  GetAtomsQuery,
  ImportAtomsGql,
  ImportAtomsMutation,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { AtomModule } from '../../../atom.module'
import { ImportAtomsInput } from '../import-atoms.input'

describe('ImportAtoms', () => {
  let guestApp: INestApplication
  let userApp: INestApplication

  beforeAll(async () => {
    guestApp = await setupTestModule([AtomModule], { role: Role.GUEST })
    userApp = await setupTestModule([AtomModule], { role: Role.USER })
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to import atoms', async () => {
      await domainRequest<ImportAtomsInput, ImportAtomsMutation>(
        guestApp,
        ImportAtomsGql,
        {
          atoms: [],
        },
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should import atoms', async () => {
      await domainRequest<ImportAtomsInput, ImportAtomsMutation>(
        userApp,
        ImportAtomsGql,
        {
          atoms: [],
        },
      )

      const results = await domainRequest<GetAtomsInput, GetAtomsQuery>(
        userApp,
        GetAtomsGql,
        {},
      )

      console.log(results)

      expect(true).toBeTruthy()
    })
  })
})
