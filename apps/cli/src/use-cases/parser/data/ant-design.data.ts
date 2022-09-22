import { AtomOGM, atomSelectionSet } from '@codelab/backend/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IAtomExport, IAtomType } from '@codelab/shared/abstract/core'
import { antdAtomData } from '@codelab/shared/data'
import { ObjectTyped } from 'object-typed'
import { v4 } from 'uuid'

export interface AntdDesignApi {
  property: string
  description: string
  type: string
  default: string
  version: string
  isEnum: boolean
}

/**
 * Map hardcoded atom enums to data
 *
 * Replace existing atom id & atom api with database ids
 */
export const createAntDesignAtomsData = async () =>
  createAtomsSeedData(await createExistingAtomMap())

type ExistingAtomMap = Map<string, OGM_TYPES.Atom>

/**
 * Create new seed data from atom types, we specify the data we want, the upsert resolution will happen later
 */
export const createAtomsSeedData = (
  atomMap: ExistingAtomMap,
): Array<IAtomExport> => {
  const atomsCreateInput: Array<IAtomExport> = ObjectTyped.keys(
    antdAtomData,
  ).map((name) => {
    // const atom = atomMap.get(name)
    const atomData = antdAtomData[name]

    if (!atomData) {
      throw new Error(`Missing data for: ${name}`)
    }

    return {
      id: v4(),
      name: name,
      icon: atomData.icon ?? null,
      type: IAtomType[name],
      // Here we specify the data we want to create, the merge resolution will take place later on
      tags: [{ id: v4(), name: atomData.tag }],
      api: {
        id: v4(),
      },
    }
  })

  return atomsCreateInput
}

/**
 * Replace id with existing ones, so we can use it to upsert
 */
export const createExistingAtomMap = async (): Promise<ExistingAtomMap> => {
  const Atom = await AtomOGM()

  const existingAtoms = (
    await Atom.find({
      selectionSet: atomSelectionSet,
    })
  ).map((atom) => [atom.name, atom] as const)

  return new Map(existingAtoms)
}
