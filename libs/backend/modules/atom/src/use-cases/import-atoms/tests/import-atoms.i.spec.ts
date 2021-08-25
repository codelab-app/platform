import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import {
  ImportAtomsGql,
  ImportAtomsInput,
  ImportAtomsMutation,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { AtomModule } from '../../../atom.module'

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
          payload: '{}',
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
          payload: '{}',
        },
      )

      // const results = await domainRequest<GetAtomsInput, GetAtomsQuery>(
      //   userApp,
      //   GetAtomsGql,
      //   {},
      // )
      //
      // console.log(results)

      expect(true).toBeTruthy()
    })
  })
})
