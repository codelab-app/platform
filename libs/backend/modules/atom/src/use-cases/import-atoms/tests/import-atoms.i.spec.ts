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
  GetExport__AtomsFragment,
  GetExportAtomsGql,
  GetExportAtomsQuery,
  ImportAtomsGql,
  ImportAtomsInput,
  ImportAtomsMutation,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { merge } from 'lodash'
import { AtomModule } from '../../../atom.module'
import { exportAtomsData } from './export-atoms.data'
import { importAtomsData } from './import-atoms.data'

const sortedAtoms = (atoms: Array<GetExport__AtomsFragment>) => {
  return atoms?.map((atom) => {
    return merge(atom, {
      api: {
        typeGraph: {
          edges: atom.api.typeGraph.edges.sort((a, b) =>
            (a?.field?.key ?? '') > (b?.field?.key ?? '') ? 1 : -1,
          ),
          vertices: atom.api.typeGraph.vertices.sort((a, b) =>
            (a?.name ?? '') > (b?.name ?? '') ? 1 : -1,
          ),
        },
      },
    })
  })
}

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
      await domainRequest<ImportAtomsInput>(
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

      /**
       * Let's sort the vertices/edges by name so order isn't considered
       *
       */
      // TODO: Need to check source & target as well
      expect(sortedAtoms(getAtoms!)).toMatchObject(sortedAtoms(exportAtomsData))
    })

    it.todo('should update existing atoms & types')
  })
})
