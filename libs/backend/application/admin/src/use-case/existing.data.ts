import type { ExistingData } from '@codelab/backend/abstract/core'
import {
  atomSelectionSet,
  exportActionTypeSelectionSet,
  exportEnumTypeSelectionSet,
  exportPrimitiveTypeSelectionSet,
  exportReactNodeTypeSelectionSet,
  exportRenderPropTypeSelectionSet,
  interfaceTypeSelectionSet,
  Repository,
  tagSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import merge from 'lodash/merge'

/**
 * Create a map of current data for upserting id's
 */
export const createExistingData = async (): Promise<ExistingData> => {
  //
  // Atom
  //

  const Atom = await Repository.instance.Atom

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

  const Tag = await Repository.instance.Tag

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

  const InterfaceType = await Repository.instance.InterfaceType

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

  const PrimitiveType = await Repository.instance.PrimitiveType

  const primitiveTypes = await PrimitiveType.find({
    selectionSet: exportPrimitiveTypeSelectionSet,
  })

  //
  // ReactNodeType
  //

  const ReactNodeType = await Repository.instance.ReactNodeType

  const reactNodeTypes = await ReactNodeType.find({
    selectionSet: exportReactNodeTypeSelectionSet,
  })

  //
  // RenderPropType
  //

  const RenderPropType = await Repository.instance.RenderPropType

  const renderPropType = await RenderPropType.find({
    selectionSet: exportRenderPropTypeSelectionSet,
  })

  //
  // ActionType
  //

  const ActionType = await Repository.instance.ActionType

  const actionType = await ActionType.find({
    selectionSet: exportActionTypeSelectionSet,
  })

  //
  // EnumType
  //

  const EnumType = await Repository.instance.EnumType

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
    ...renderPropType,
    ...actionType,
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
    ...actionType,
    ...renderPropType,
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
        interfaceType.fields.map((field) => ({
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
    api: interfaceTypesKeyByName,
    atoms: atomsKeyByName,
    atomsById: atomsKeyById,
    fields: fieldsKeyByCompositeKey,
    tags: tagsKeyByName,
    types: typesKeyByName,
    typesById: typesKeyById,
  }
}
