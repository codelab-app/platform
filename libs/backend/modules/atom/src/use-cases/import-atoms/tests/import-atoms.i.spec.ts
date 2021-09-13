import { domainRequest } from '@codelab/backend/infra'
import { setupTestModule, teardownTestModule } from '@codelab/backend/nestjs'
import { AtomType, Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { merge } from 'lodash'
import { AtomModule } from '../../../atom.module'
import {
  TestGetExport__AtomsFragment,
  TestGetExportAtomsGql,
  TestGetExportAtomsQuery,
} from '../../export-atoms/get-export-atoms.api.graphql.gen'
import { GetAtomInput } from '../../get-atom/get-atom.input'
import {
  TestGetAtomGql,
  TestGetAtomQuery,
} from '../../get-atom/tests/get-atom.api.graphql.gen'
import { GetAtomsInput } from '../../get-atoms/get-atoms.input'
import { ImportAtomsInput } from '../import-atoms.input'
import { exportAtomsData } from './export-atoms.data'
import {
  TestImportAtomsGql,
  TestImportAtomsMutation,
} from './import-atoms.api.graphql.gen'
import { importAtomsData } from './import-atoms.data'

const sortedAtoms = (atoms: Array<TestGetExport__AtomsFragment>) => {
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
    guestApp = await setupTestModule([AtomModule], { role: Role.Guest })
    userApp = await setupTestModule([AtomModule], { role: Role.User })
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
      await domainRequest<ImportAtomsInput, TestImportAtomsMutation>(
        guestApp,
        TestImportAtomsGql,
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
        TestImportAtomsGql,
        importAtomsInput,
      )

      const { atom } = await domainRequest<GetAtomInput, TestGetAtomQuery>(
        userApp,
        TestGetAtomGql,
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
        TestGetExportAtomsQuery
      >(userApp, TestGetExportAtomsGql, getAtomsInput)

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
