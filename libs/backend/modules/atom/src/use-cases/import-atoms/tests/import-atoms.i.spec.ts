import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { AtomType } from '@codelab/shared/enums'
import { INestApplication } from '@nestjs/common'
import { AtomModule } from '../../../atom.module'
import {
  GetExportAtomsGql,
  GetExportAtomsQuery,
} from '../../export-atoms/get-export-atoms.api.graphql'
import { GetAtomInput } from '../../get-atom/get-atom.input'
import {
  GetAtomGql,
  GetAtomQuery,
} from '../../get-atom/tests/get-atom.api.graphql'
import { GetAtomsInput } from '../../get-atoms/get-atoms.input'
import { ImportAtomsInput } from '../import-atoms.input'
import { exportAtomsData } from './export-atoms.data'
import { ImportAtomsGql, ImportAtomsMutation } from './import-atoms.api.graphql'
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

      const { atom } = await domainRequest<GetAtomInput, GetAtomQuery>(
        userApp,
        GetAtomGql,
        {
          where: { type: AtomType.AntDesignCard },
        },
      )

      if (!atom) {
        throw new Error('Atom not found')
      }

      const getAtomsInput: GetAtomsInput = {
        where: {
          ids: [atom.id],
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
