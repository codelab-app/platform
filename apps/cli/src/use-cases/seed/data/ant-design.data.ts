import {
  AtomOGM,
  atomSelectionSet,
  InterfaceTypeOGM,
  interfaceTypeSelectionSet,
  TagOGM,
  tagSelectionSet,
} from '@codelab/backend/adapter/neo4j'
import {
  ExistingData,
  IAtomImport,
  IAtomType,
  IInterfaceTypeExport,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { antdAtomData } from '@codelab/shared/data'
import { ObjectTyped } from 'object-typed'
import { v4 } from 'uuid'

export const getApiName = (name: string) => {
  return `${name} API`
}

/**
 * We need to create interface separately, our atom creation logic only links to existing interfaces
 */
export const createAntDesignInterfaceData = (
  data: ExistingData,
): Array<IInterfaceTypeExport> => {
  return ObjectTyped.keys(antdAtomData).map((name) => {
    const atomApiId = data.api.get(getApiName(name))?.id ?? v4()

    return {
      __typename: ITypeKind.InterfaceType,
      id: atomApiId,
      name: getApiName(name),
      kind: ITypeKind.InterfaceType,
      fieldsConnection: {
        edges: [],
      },
      ownerConnection: {
        edges: [],
      },
    }
  })
}

/**
 * Create new seed data from atom types, we specify the data we want, the upsert resolution will happen later
 */
export const createAtomsSeedData = (data: ExistingData): Array<IAtomImport> => {
  return ObjectTyped.keys(antdAtomData).map((name) => {
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
      // allowedChildren: createAllowedChildren(antdAtomData[name]),
      /**
       * Hard to make this re-useable, lookup may be keyed by id or name
       * @param newData
       */
      allowedChildren: (newData: ExistingData) => {
        const newAtomData = antdAtomData[name]

        if (!atomData) {
          throw new Error(`Missing data for: ${name}`)
        }

        return (
          newAtomData?.allowedChildren?.map((child) => {
            // Get the id of the existing atom by name
            const existingAtom = newData.atoms.get(child)

            if (!existingAtom) {
              throw new Error('Allowed atom not found')
            }

            return { id: existingAtom.id, name: existingAtom.name }
          }) ?? []
        )
      },
    }
  })
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

  const existingAtomsById = (
    await Atom.find({
      selectionSet: atomSelectionSet,
    })
  ).map((atom) => [atom.id, atom] as const)

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
    atomsById: new Map(existingAtomsById),
    api: new Map(existingInterfaceTypes),
  }
}
