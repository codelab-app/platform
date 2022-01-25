import { domainRequest } from '@codelab/backend/shared/testing'
import { AtomType, IField } from '@codelab/shared/abstract/core'
import { merge } from 'lodash'
import { setupAtomTestModule } from '../../../test/setupAtomTestModule'
import {
  TestGetExport__AtomsFragment,
  TestGetExportAtomsGql,
  TestGetExportAtomsQuery,
} from '../../export-atoms/get-export-atoms.api.graphql.gen'
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
            ((a as IField)?.key ?? '') > ((b as IField)?.key ?? '') ? 1 : -1,
          ),
          vertices: atom.api.typeGraph.vertices.sort((a, b) =>
            (a?.name ?? '') > (b?.name ?? '') ? 1 : -1,
          ),
        },
      },
    })
  })
}

const expectedAtoms = (
  atoms: Array<TestGetExport__AtomsFragment>,
  idMap: Map<string, string>,
) => {
  return atoms?.map((atom) => {
    return merge(atom, {
      api: {
        typeGraph: {
          vertices: atom.api.typeGraph.vertices.map((v) => ({
            ...v,
            id: idMap.get(v.id),
          })),
          edges: atom.api.typeGraph.edges.map((e) => ({
            ...e,
            target: idMap.get(e.target),
            source: idMap.get(e.source),
          })),
        },
      },
    })
  })
}

describe('ImportAtoms', () => {
  const testModule = setupAtomTestModule(true)
  let importAtomsInput: ImportAtomsInput

  describe('Guest', () => {
    importAtomsInput = {
      payload: JSON.stringify(importAtomsData),
    }

    it('should fail to import atoms', async () => {
      await domainRequest<ImportAtomsInput, TestImportAtomsMutation>(
        testModule.guestApp,
        TestImportAtomsGql,
        importAtomsInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    importAtomsInput = {
      payload: JSON.stringify(importAtomsData),
    }

    it('should fail to import atoms', async () => {
      await domainRequest<ImportAtomsInput, TestImportAtomsMutation>(
        testModule.userApp,
        TestImportAtomsGql,
        importAtomsInput,
        {
          message: 'Admin access only',
        },
      )
    })
  })

  describe('Admin', () => {
    it('should import atoms', async () => {
      await domainRequest<ImportAtomsInput>(
        testModule.adminApp,
        TestImportAtomsGql,
        importAtomsInput,
      )

      const atom = await testModule.getAtom({
        where: { type: AtomType.AntDesignCard },
      })

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
      >(testModule.userApp, TestGetExportAtomsGql, getAtomsInput)

      const newVertices = getAtoms?.[0].api.typeGraph.vertices ?? []
      const oldVertices = exportAtomsData[0].api.typeGraph.vertices

      const idMap = new Map(
        newVertices.map((nv) => [
          oldVertices.find((v2) => v2.name === nv.name)?.id as string,
          nv.id,
        ]),
      )

      /**
       * Let's sort the vertices/edges by name so order isn't considered
       *
       */
      expect(sortedAtoms(getAtoms!)).toMatchObject(
        expectedAtoms(sortedAtoms(exportAtomsData as any), idMap),
      )
    })

    it.todo('should update existing atoms & types')
  })
})
