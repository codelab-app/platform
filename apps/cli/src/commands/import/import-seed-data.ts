import type { ExistingData, ExportedData } from '@codelab/backend/abstract/core'
import fs from 'fs'

export const importSeedData = async (
  selectedUser: string,
  seedFilePath: string,
) => {
  const json = fs.readFileSync(seedFilePath, 'utf8')
  const { atoms, types, tags } = JSON.parse(json) as Omit<ExportedData, 'app'>

  const mappedAtoms = atoms.map((atom) => {
    return {
      ...atom,
      allowedChildren: (data: ExistingData) => {
        return atom.allowedChildren.map((child) => {
          const existingAtom = data.atomsById[child.id]

          if (!existingAtom) {
            throw new Error('Missing atom')
          }

          return {
            id: existingAtom.id,
            name: existingAtom.name,
          }
        })
      },
    }
  })

  /**
   * Type must be seeded first, so atom can reference it
   */
  // await importTypes(types, selectedUser, (type) => ({ name: type.name }))

  // await importTags(tags, selectedUser)

  // await importAtoms({
  //   atoms: mappedAtoms,
  //   userId: selectedUser,
  //   atomWhere: (atom) => ({ name: atom.name }),
  //   tagWhere: (tag) => ({ name: tag.name }),
  // })

  // await importFields(createImportFieldsData(types, await createExistingData()))
}
