import type { ExportedData } from '@codelab/backend/abstract/core'
import { exportAtoms, exportSystemTypes } from '@codelab/backend/data'
import { exportAdminTypes } from './export-admin-types'
import { exportTags } from './export-tags'

export const exportSeedData = async () => {
  const atomsData = await exportAtoms()
  const tagsData = await exportTags()
  const systemTypes = await exportSystemTypes()
  const adminTypes = await exportAdminTypes()

  // We'll want to sort the data so diff is minimized
  const sortedAtomsData = atomsData
    // Sort nested properties, since we can't do this with OGM
    .map((atom) => ({
      ...atom,
      allowedChildren: atom.allowedChildren.sort((a, b) =>
        a.id.localeCompare(b.id),
      ),
    }))

  const sortedTagsData = tagsData
    // Sort children values
    .map((tag) => ({
      ...tag,
      children: tag.children.sort((a, b) => a.id.localeCompare(b.id)),
    }))

  const seedData: Omit<
    ExportedData,
    'apps' | 'stores' | 'resources' | 'domains'
  > = {
    atoms: sortedAtomsData,
    types: [...systemTypes, ...adminTypes],
    tags: sortedTagsData,
    types: seedTypesData,
  }

  return seedData
}
