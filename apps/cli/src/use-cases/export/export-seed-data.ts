import type { ExportedData } from '@codelab/backend/abstract/core'
import { exportAtoms } from './export-atoms'
import { exportTags } from './export-tags'
import { exportTypes } from './export-types'

export const exportSeedData = async () => {
  const atomsData = await exportAtoms()
  const tagsData = await exportTags()
  const seedTypesData = await exportTypes()

  // We'll want to sort the data so diff is minimized
  const sortedAtomsData = atomsData
    // Sort nested properties, since we can't do this with OGM
    .map((atom) => ({
      ...atom,
      allowedChildren: atom.allowedChildren.sort((a, b) =>
        a.name.localeCompare(b.name),
      ),
    }))

  const sortedTagsData = tagsData
    // Sort children values
    .map((tag) => ({
      ...tag,
      children: tag.children?.sort((a, b) => a.id.localeCompare(b.id)),
    }))

  const seedData: Omit<
    ExportedData,
    'apps' | 'stores' | 'resources' | 'domains'
  > = {
    atoms: sortedAtomsData,
    types: seedTypesData,
    tags: sortedTagsData,
  }

  return seedData
}
