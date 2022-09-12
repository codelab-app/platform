import { ExportedData } from '../../commands/export/export.types'
import { exportAtoms } from './export-atoms'
import { exportSeedTypes } from './export-seed-types'
import { exportTags } from './export-tags'

export const exportSeedData = async () => {
  const atomsData = await exportAtoms()
  const tagsData = await exportTags()
  const seedTypesData = await exportSeedTypes()

  const seedData: Omit<
    ExportedData,
    'apps' | 'stores' | 'resources' | 'domains'
  > = {
    atoms: atomsData,
    types: seedTypesData,
    tags: tagsData,
  }

  return seedData
}
