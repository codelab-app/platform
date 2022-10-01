import {
  exportEnumTypeSelectionSet,
  exportInterfaceTypeSelectionSet,
  exportPrimitiveTypeSelectionSet,
  exportReactNodeTypeSelectionSet,
  exportRenderPropsTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { ITypeExport } from '@codelab/shared/abstract/core'
import { sortInterfaceTypesFields } from './get-type'

export const exportTypes = async (): Promise<Array<ITypeExport>> => {
  /**
   * Export all primitive types
   */
  const PrimitiveType = await Repository.instance.PrimitiveType

  const primitiveTypes = await PrimitiveType.find({
    selectionSet: exportPrimitiveTypeSelectionSet,
    options: {
      sort: [{ name: OGM_TYPES.SortDirection.Asc }],
    },
  })

  /**
   * React Node Type
   */
  const ReactNodeType = await Repository.instance.ReactNodeType

  // Only 1 here
  const reactNodeTypes = await ReactNodeType.find({
    selectionSet: exportReactNodeTypeSelectionSet,
    options: {
      sort: [{ name: OGM_TYPES.SortDirection.Asc }],
    },
  })

  /**
   * Render Props Type
   */
  const RenderPropsType = await Repository.instance.RenderPropsType

  // Only 1 here
  const renderPropsTypes = await RenderPropsType.find({
    selectionSet: exportRenderPropsTypeSelectionSet,
    options: {
      sort: [{ name: OGM_TYPES.SortDirection.Asc }],
    },
  })

  /**
   * Enum
   */
  const EnumType = await Repository.instance.EnumType

  const enumTypes = (
    await EnumType.find({
      selectionSet: exportEnumTypeSelectionSet,
      options: {
        sort: [{ name: OGM_TYPES.SortDirection.Asc }],
      },
    })
  ).map((type) => ({
    ...type,
    allowedValues: type.allowedValues.sort((a, b) =>
      a.key.toString().localeCompare(b.key),
    ),
  }))

  /**
   * Get all interfaces that are connected to atoms, here we don't do dependent types since Ant Design atoms don't have them (at least I haven't seen any)
   *
   * We will go through dependent types for user interfaces however
   */
  const InterfaceType = await Repository.instance.InterfaceType

  const interfaceTypes = await InterfaceType.find({
    where: {
      apiOfAtomsAggregate: {
        count_GT: 0,
      },
    },
    options: {
      sort: [{ name: OGM_TYPES.SortDirection.Asc }],
    },
    selectionSet: exportInterfaceTypeSelectionSet,
  })

  /**
   * Here we create the interface dependency tree order
   *
   * Further to the front are closer to the leaf.
   */
  return [
    ...primitiveTypes,
    ...renderPropsTypes,
    ...reactNodeTypes,
    ...enumTypes,
    // Put interfaces last since they depend on primitive types when seeding
    ...sortInterfaceTypesFields(interfaceTypes),
  ] as Array<ITypeExport>
}
