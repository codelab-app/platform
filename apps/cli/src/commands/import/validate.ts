import { AtomOGM, IAtomModel } from '@codelab/backend'
import { IPageExport } from '@codelab/shared/abstract/core'
import { flatMap } from 'lodash'

export const validate = async (pages: Array<IPageExport>) => {
  const Atoms = await AtomOGM()

  let allAtomIds = flatMap(
    pages,
    (page) =>
      page.elements.map((e) => e.atom?.id).filter(Boolean) as Array<string>,
  )

  allAtomIds = [...new Set(allAtomIds)]

  const foundAtoms = await Atoms.find({
    where: { id_IN: allAtomIds },
  })

  const foundAtomsMap = new Map<string, IAtomModel>(
    foundAtoms.map((f) => [f.id, f]),
  )

  const notFound = allAtomIds.filter((id) => !foundAtomsMap.has(id))

  if (notFound.length) {
    throw new Error(`Can't find Atoms with ids "${notFound.join(', ')}"`)
  }
}
