import fs from 'fs'
import { importAtoms } from '../../use-cases/import/import-atoms'
import { importTags } from '../../use-cases/import/import-tags'
import { importTypes } from '../../use-cases/import/import-types'
import { ExportedData } from '../export/export.types'

export const importSeedData = async (
  selectedUser: string,
  seedFilePath: string,
) => {
  const json = fs.readFileSync(seedFilePath, 'utf8')
  const { atoms, types, tags } = JSON.parse(json) as Omit<ExportedData, 'app'>

  await importTags(tags, selectedUser)

  // Type must be seeded first, so atom can reference it
  // ID's must be in sync
  await importTypes(types, selectedUser, (type) => ({ id: type.id }))

  await importAtoms({
    atoms,
    userId: selectedUser,
    atomWhere: (atom) => ({ id: atom.id }),
    tagWhere: (tag) => ({ id: tag.id }),
  })
}
