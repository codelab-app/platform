import {
  ExistingData,
  ExportedData,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import fs from 'fs'
import { importAtoms } from '../../use-cases/import/import-atoms'
import { importTags } from '../../use-cases/import/import-tags'
import { importTypes } from '../../use-cases/import/import-types'

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
          const existingAtom = data.atomsById.get(child.id)

          if (!existingAtom) {
            throw new Error('Missing atom')
          }

          return {
            id: existingAtom.id,
          }
        })
      },
    }
  })

  /**
   * Type must be seeded first, so atom can reference it
   */
  await importTypes(
    /**
     * Don't create interfaces here, since our atom create logic also creates the interface
     */
    types.filter((type) => type.kind !== ITypeKind.InterfaceType),
    selectedUser,
    (type) => ({ id: type.id }),
  )

  await importTags(tags, selectedUser)

  await importAtoms({
    atoms: mappedAtoms,
    userId: selectedUser,
    atomWhere: (atom) => ({ id: atom.id }),
    tagWhere: (tag) => ({ id: tag.id }),
  })
}
