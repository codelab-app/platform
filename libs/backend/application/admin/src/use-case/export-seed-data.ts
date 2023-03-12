import type { ExportedAdminData } from '@codelab/backend/abstract/core'
import { exportAtoms } from '@codelab/backend/application/atom'
import { exportTags } from '@codelab/backend/application/tag'
import {
  exportAdminInterfaceTypes,
  exportAdminTypes,
  exportSystemTypes,
} from '@codelab/backend/application/type'

export const exportSeedData = async () => {
  const atomsData = await exportAtoms()
  const tagsData = await exportTags()
  const systemTypes = await exportSystemTypes()
  const adminTypes = await exportAdminTypes()
  const adminInterfaceTypes = await exportAdminInterfaceTypes()

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
    ExportedAdminData,
    'apps' | 'stores' | 'resources' | 'domains'
  > = {
    atoms: sortedAtomsData,
    types: [...systemTypes, ...adminTypes],
    apis: adminInterfaceTypes,
    tags: sortedTagsData,
    types: seedTypesData,
  }

  return seedData
}
