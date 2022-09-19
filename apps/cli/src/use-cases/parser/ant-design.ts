import { AtomOGM, atomSelectionSet } from '@codelab/backend/adapter/neo4j'
import { IAtomExport, IAtomType } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export interface AntdDesignApi {
  property: string
  description: string
  type: string
  default: string
  version: string
  isEnum: boolean
  isUnion: boolean
}

/**
 * Map hardcoded atom enums to data
 *
 * Replace existing atom id & atom api with database ids
 */
export const createAntDesignAtomsData = async (): Promise<
  Array<IAtomExport>
> => {
  const Atom = await AtomOGM()

  const existingAtoms = (
    await Atom.find({
      selectionSet: atomSelectionSet,
    })
  ).map((atom) => [atom.name, atom] as const)

  const atomNameToIdMap = new Map(existingAtoms)
  const atomNames = Object.values(IAtomType)

  return atomNames.map((name) => ({
    id: atomNameToIdMap.get(name)?.id ?? v4(),
    name: name,
    type: name,
    api: {
      id: atomNameToIdMap.get(name)?.api?.id,
    },
  }))
}
