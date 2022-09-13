import { AtomOGM } from '@codelab/backend/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IPageExport } from '@codelab/shared/abstract/core'
import { flatMap } from 'lodash'

export const validate = async (pages: Array<IPageExport>) => {
  const Atoms = await AtomOGM()

  let allAtomIds = flatMap(
    pages,
    (page) =>
      page.elements
        .map((e) => e.renderAtomType?.id)
        .filter(Boolean) as Array<string>,
  )

  allAtomIds = [...new Set(allAtomIds)]

  const foundAtoms = await Atoms.find({
    where: { id_IN: allAtomIds },
  })

  const foundAtomsMap = new Map<string, OGM_TYPES.Atom>(
    foundAtoms.map((f) => [f.id, f]),
  )

  const notFound = allAtomIds.filter((id) => !foundAtomsMap.has(id))

  if (notFound.length) {
    throw new Error(`Can't find Atoms with ids "${notFound.join(', ')}"`)
  }
}
