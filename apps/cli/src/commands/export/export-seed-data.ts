import fs from 'fs'
import { exportAtom } from '../../use-cases/export/export-atom'
import { exportSeedTypes } from '../../use-cases/export/export-seed-types'
import { seedFilePath } from '../import/import-seed-data'
import type { ExportedData } from './export.command'

export const exportSeedData = async () => {
  const atomData = await exportAtom()
  const typeData = await exportSeedTypes()

  const seedData: Omit<
    ExportedData,
    'app' | 'stores' | 'resources' | 'domains'
  > = {
    ...atomData,
    ...typeData,
  }

  const seedDataString = JSON.stringify(seedData, null, 2)
  fs.writeFileSync(seedFilePath, seedDataString)
}
