import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { ImportApiGql, ImportApiInput } from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { TypeModule } from '../../../../type.module'
import { importApiData } from './import-api.data'

describe('ImportApi', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let importApiInput: ImportApiInput

  beforeAll(async () => {
    guestApp = await setupTestModule([TypeModule], {
      role: Role.GUEST,
    })
    userApp = await setupTestModule([TypeModule], {
      role: Role.USER,
    })
    importApiInput = {
      payload: JSON.stringify(importApiData),
    }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should not import api', async () => {
      await domainRequest<ImportApiInput>(
        guestApp,
        ImportApiGql,
        importApiInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  // describe('User', () => {
  //   it('should import api', async () => {
  //     await domainRequest<ImportApiInput>(userApp, ImportApiGql, importApiInput)
  //
  //     const { getAtom } = await domainRequest<GetAtomInput, GetAtomQuery>(
  //       userApp,
  //       GetAtomGql,
  //       {
  //         where: { type: AtomType.AntDesignButton },
  //       },
  //     )
  //
  //     if (!getAtom) {
  //       throw new Error('Atom not found')
  //     }
  //
  //     const getAtomsInput: GetAtomsInput = {
  //       where: {
  //         ids: [getAtom.id],
  //       },
  //     }
  //
  //     /**
  //      * Check atom exists
  //      */
  //     const { exportAtoms } = await domainRequest<
  //       GetAtomsInput,
  //       ExportAtomsQuery
  //     >(guestApp, ExportAtomsGql, getAtomsInput)
  //
  //     expect(false).toBeTruthy()
  //   })
  // })
})
