import {
  AtomOGM,
  atomSelectionSet,
  InterfaceTypeOGM,
  interfaceTypeSelectionSet,
  TagOGM,
  tagSelectionSet,
} from '@codelab/backend/adapter/neo4j'
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

export const getApiName = (name: string) => {
  return `${name} API`
}

/**
 * Map hardcoded atom enums to data
 *
 * Replace existing atom id & atom api with database ids
 */
export const createAntDesignAtomsData = async () =>
  createAtomsSeedData(await createExistingData())

interface ExistingData {
  atoms: Map<string, OGM_TYPES.Atom>
  tags: Map<string, OGM_TYPES.Tag>
  api: Map<string, OGM_TYPES.InterfaceType>
}

/**
 * Create new seed data from atom types, we specify the data we want, the upsert resolution will happen later
 */
export const createAtomsSeedData = (data: ExistingData): Array<IAtomExport> => {
  const atomsCreateInput: Array<IAtomExport> = ObjectTyped.keys(
    antdAtomData,
  ).map((name) => {
    const atomData = antdAtomData[name]

    if (!atomData) {
      throw new Error(`Missing data for: ${name}`)
    }

    const atomId = data.atoms.get(name)?.id ?? v4()
    const atomTagId = data.tags.get(name)?.id ?? v4()
    const atomApiId = data.api.get(getApiName(name))?.id ?? v4()

    return {
      id: atomId,
      name: name,
      icon: atomData.icon ?? null,
      type: IAtomType[name],
      // Here we specify the data we want to create, the merge resolution will take place later on
      tags: [{ id: atomTagId, name: atomData.tag }],
      api: {
        id: atomApiId,
        name: getApiName(name),
      },
    }
  })

  return atomsCreateInput
}

/**
 * Create a map of current data for upserting id's
 */
export const createExistingData = async (): Promise<ExistingData> => {
  // Atom
  const Atom = await AtomOGM()

  const existingAtoms = (
    await Atom.find({
      selectionSet: atomSelectionSet,
    })
  ).map((atom) => [atom.name, atom] as const)

  // Tag
  const Tag = await TagOGM()

  const existingTags = (
    await Tag.find({
      selectionSet: tagSelectionSet,
    })
  ).map((tag) => [tag.name, tag] as const)

  // InterfaceType
  const InterfaceType = await InterfaceTypeOGM()

  const existingInterfaceTypes = (
    await InterfaceType.find({
      selectionSet: interfaceTypeSelectionSet,
    })
  ).map((type) => [type.name, type] as const)

  return {
    tags: new Map(existingTags),
    atoms: new Map(existingAtoms),
    api: new Map(existingInterfaceTypes),
  }
}
