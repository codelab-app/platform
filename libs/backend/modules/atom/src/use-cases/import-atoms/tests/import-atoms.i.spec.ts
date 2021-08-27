import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import {
  AtomType,
  GetAtomGql,
  GetAtomInput,
  GetAtomQuery,
  GetAtomsInput,
  GetExportAtomsGql,
  GetExportAtomsQuery,
  GetTypeGql,
  GetTypesInput,
  GetTypesQuery,
  ImportApiInput,
  ImportAtomsGql,
  ImportAtomsInput,
  ImportAtomsMutation,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { AtomModule } from '../../../atom.module'
import { exportAtomsData } from './export-atoms.data'
import { importAtomsData } from './import-atoms.data'

describe('ImportAtoms', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let importAtomsInput: ImportAtomsInput

  beforeAll(async () => {
    guestApp = await setupTestModule([AtomModule], { role: Role.GUEST })
    userApp = await setupTestModule([AtomModule], { role: Role.USER })
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    importAtomsInput = {
      payload: JSON.stringify(importAtomsData),
    }

    it('should fail to import atoms', async () => {
      await domainRequest<ImportAtomsInput, ImportAtomsMutation>(
        guestApp,
        ImportAtomsGql,
        importAtomsInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should import atoms', async () => {
      await domainRequest<ImportApiInput>(
        userApp,
        ImportAtomsGql,
        importAtomsInput,
      )

      const { getAtom } = await domainRequest<GetAtomInput, GetAtomQuery>(
        userApp,
        GetAtomGql,
        {
          where: { type: AtomType.AntDesignCard },
        },
      )

      if (!getAtom) {
        throw new Error('Atom not found')
      }

      const getAtomsInput: GetAtomsInput = {
        where: {
          ids: [getAtom.id],
        },
      }

      /**
       * Can't test exportAtoms here, so we test getExportAtoms instead.
       */
      const { getAtoms } = await domainRequest<
        GetAtomsInput,
        GetExportAtomsQuery
      >(userApp, GetExportAtomsGql, getAtomsInput)

      const results = await domainRequest<GetTypesInput, GetTypesQuery>(
        userApp,
        GetTypeGql,
      )

      /**
       * Remove id from tree
       */
      expect(getAtoms).toMatchObject(exportAtomsData)
    })
  })
})
