import type { IPageExport } from '@codelab/backend/abstract/core'
import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import flatMap from 'lodash/flatMap'

export const validate = async (pages: Array<IPageExport>) => {
  const Atoms = await Repository.instance.Atom

  let allAtomIds = flatMap(
    pages,
    (page) =>
      page.elements
        .map((element) => element.renderAtomType?.id)
        .filter(Boolean) as Array<string>,
  )

  let allAtomNames = flatMap(
    pages,
    (page) =>
      page.elements
        .map((element) => element.renderAtomType?.name)
        .filter(Boolean) as Array<string>,
  )

  allAtomIds = [...new Set(allAtomIds)]
  allAtomNames = [...new Set(allAtomNames)]

  const foundAtoms = await Atoms.find({
    where: { OR: [{ id_IN: allAtomIds }, { name_IN: allAtomNames }] },
  })

  if (foundAtoms.length !== allAtomIds.length) {
    const foundAtomsSet = new Set(foundAtoms.map((atom) => atom.name))
    const notFound = allAtomNames.filter((name) => !foundAtomsSet.has(name))

    throw new Error(`Can't find Atoms with names "${notFound.join('", "')}"`)
  }
}
