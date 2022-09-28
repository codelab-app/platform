import { ExportedData } from '../../commands/export/export.types'
import { exportAtoms } from './export-atoms'
import { exportSeedTypes } from './export-seed-types'
import { exportTags } from './export-tags'

export const exportSeedData = async () => {
  const atomsData = await exportAtoms()
  const tagsData = await exportTags()
  const seedTypesData = await exportSeedTypes()
  // We'll want to sort the data so diff is minimized
  const sortedAtomsData = atomsData.sort((a, b) => a.name.localeCompare(b.name))

  const seedData: Omit<
    ExportedData,
    'apps' | 'stores' | 'resources' | 'domains'
  > = {
    atoms: sortedAtomsData,
    types: seedTypesData,
    tags: tagsData,
  }

  return seedData
}
