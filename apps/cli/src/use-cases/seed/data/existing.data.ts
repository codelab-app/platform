import {
  AtomOGM,
  atomSelectionSet,
  EnumTypeOGM,
  exportEnumTypeSelectionSet,
  exportPrimitiveTypeSelectionSet,
  exportReactNodeTypeSelectionSet,
  exportRenderPropsTypeSelectionSet,
  InterfaceTypeOGM,
  interfaceTypeSelectionSet,
  PrimitiveTypeOGM,
  ReactNodeTypeOGM,
  RenderPropsTypeOGM,
  TagOGM,
  tagSelectionSet,
} from '@codelab/backend/adapter/neo4j'
import { ExistingData } from '@codelab/shared/abstract/core'
import merge from 'lodash/merge'

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

  const atomsKeyByName = atoms
    .map((atom) => ({ [atom.name]: atom }))
    .reduce(merge, {})

  const atomsKeyById = atoms
    .map((atom) => ({ [atom.id]: atom }))
    .reduce(merge, {})

  //
  // Tag
  //

  const Tag = await TagOGM()

  const tagsKeyByName = (
    await Tag.find({
      selectionSet: tagSelectionSet,
    })
  )
    .map((tag) => ({ [tag.name]: tag }))
    .reduce(merge, {})

  //
  // InterfaceType
  //

  const InterfaceType = await InterfaceTypeOGM()

  const interfaceTypes = await InterfaceType.find({
    selectionSet: interfaceTypeSelectionSet,
  })

  const interfaceTypesKeyByName = interfaceTypes
    .map((type) => ({
      [type.name]: type,
    }))
    .reduce(merge, {})

  //
  // PrimitiveType
  //

  const PrimitiveType = await PrimitiveTypeOGM()

  const primitiveTypes = await PrimitiveType.find({
    selectionSet: exportPrimitiveTypeSelectionSet,
  })

  //
  // ReactNodeType
  //

  const ReactNodeType = await ReactNodeTypeOGM()

  const reactNodeTypes = await ReactNodeType.find({
    selectionSet: exportReactNodeTypeSelectionSet,
  })

  //
  // RenderPropsType
  //

  const RenderPropsType = await RenderPropsTypeOGM()

  const renderPropsType = await RenderPropsType.find({
    selectionSet: exportRenderPropsTypeSelectionSet,
  })

  //
  // EnumType
  //

  const EnumType = await EnumTypeOGM()

  const enumTypes = await EnumType.find({
    selectionSet: exportEnumTypeSelectionSet,
  })

  //
  // Combined Types
  //

  const typesKeyByName = [
    ...interfaceTypes,
    ...primitiveTypes,
    ...reactNodeTypes,
    ...renderPropsType,
    ...enumTypes,
  ]
    .map((type) => ({
      [type.name]: type,
    }))
    .reduce(merge, {})

  const typesKeyById = [
    ...interfaceTypes,
    ...primitiveTypes,
    ...reactNodeTypes,
    ...renderPropsType,
    ...enumTypes,
  ]
    .map((type) => ({
      [type.id]: type,
    }))
    .reduce(merge, {})

  //
  // Fields
  //

  const fieldsKeyByCompositeKey =
    /**
     * Create Array<[ref, field]>
     */
    interfaceTypes
      .flatMap((interfaceType) =>
        interfaceType.fieldsConnection.edges.map((field) => ({
          /**
           * Key by composite key with interfaceName & fieldKey
           */
          [`${interfaceType.name}-${field.key}`]: field,
        })),
      )
      .reduce(merge, {})

  // logger.info('Existing InterfaceType', interfaceTypes)
  // logger.info('Existing Fields', fieldsKeyByCompositeKey)

  return {
    tags: tagsKeyByName,
    atoms: atomsKeyByName,
    atomsById: atomsKeyById,
    api: interfaceTypesKeyByName,
    fields: fieldsKeyByCompositeKey,
    types: typesKeyByName,
    typesById: typesKeyById,
  }
}
