import fs from 'fs'
import { exportAtom } from '../../use-cases/export/export-atom'
import { exportSeedTypes } from '../../use-cases/export/export-seed-types'
import { exportTag } from '../../use-cases/export/export-tag'
import { seedFilePath } from '../import/config'
import type { ExportedData } from './export.command'

export const exportSeedData = async () => {
  const atomData = await exportAtom()
  const tagData = await exportTag()
  const typeData = await exportSeedTypes()

  const seedData: Omit<
    ExportedData,
    'app' | 'stores' | 'resources' | 'domains'
  > = {
    ...atomData,
    ...typeData,
    ...tagData,
  }

  const seedDataString = JSON.stringify(seedData, null, 2)
  fs.writeFileSync(seedFilePath, seedDataString)
}
