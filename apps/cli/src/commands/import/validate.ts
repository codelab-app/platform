import { OGM_TYPES } from '@codelab/backend/abstract/codegen'
import { IPageExport } from '@codelab/backend/abstract/core'
import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import flatMap from 'lodash/flatMap'

export const validate = async (pages: Array<IPageExport>) => {
  const Atoms = await Repository.instance.Atom

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
