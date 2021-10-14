import {
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { TypeModule } from '../../../../type.module'

describe('ImportApi', () => {
  let guestApp: INestApplication
  let userApp: INestApplication

  beforeAll(async () => {
    guestApp = await setupTestModule([TypeModule], {
      role: Role.Guest,
    })
    userApp = await setupTestModule([TypeModule], {
      role: Role.User,
    })
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it.skip('should not import api', async () => {
      // await domainRequest<ImportApiInput>(
      //   guestApp,
      //   ImportApiGql,
      //   importApiInput,
      //   {
      //     message: 'Unauthorized',
      //   },
      // )
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
