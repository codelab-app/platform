import {
  AtomOGM,
  atomSelectionSet,
  InterfaceTypeOGM,
  interfaceTypeSelectionSet,
  TagOGM,
  tagSelectionSet,
} from '@codelab/backend/adapter/neo4j'
import { ExistingData } from '@codelab/shared/abstract/core'
import { logger } from '@codelab/shared/adapter/logging'

/**
 * Create a map of current data for upserting id's
 */
export const createExistingData = async (): Promise<ExistingData> => {
  //
  // Atom
  //

  const Atom = await AtomOGM()

  const atoms = await Atom.find({
    selectionSet: atomSelectionSet,
  })

  const existingAtoms = atoms.reduce(
    (record, atom) => ({ ...record, [atom.name]: atom }),
    {},
  )

  const existingAtomsById = atoms.reduce(
    (record, atom) => ({ ...record, [atom.id]: atom }),
    {},
  )

  //
  // Tag
  //

  const Tag = await TagOGM()

  const existingTags = (
    await Tag.find({
      selectionSet: tagSelectionSet,
    })
  ).reduce((record, tag) => ({ ...record, [tag.name]: tag }), {})

  //
  // InterfaceType
  //

  const InterfaceType = await InterfaceTypeOGM()

  const existingInterfaceTypes = await InterfaceType.find({
    selectionSet: interfaceTypeSelectionSet,
  })

  const interfaceTypes = existingInterfaceTypes.reduce(
    (record, type) => ({ ...record, [type.name]: type }),
    {},
  )

  //
  // Fields
  //

  const existingFieldsMap =
    /**
     * Create Array<[ref, field]>
     */
    existingInterfaceTypes.reduce(
      (record, interfaceType) =>
        interfaceType.fieldsConnection.edges.map((field) => ({
          ...record,
          /**
           * Key by composite key with interfaceName & fieldKey
           */
          [`${interfaceType.name}-${field.key}`]: field,
        })),
      {},
    )

  logger.info('Existing InterfaceType', existingInterfaceTypes)
  logger.info('Existing Fields', existingFieldsMap)

  return {
    tags: existingTags,
    atoms: existingAtoms,
    atomsById: existingAtomsById,
    api: interfaceTypes,
    fields: existingFieldsMap,
  }
}
