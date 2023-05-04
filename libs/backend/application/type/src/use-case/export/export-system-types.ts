import type { ITypesExport } from '@codelab/backend/abstract/core'
import {
  exportActionTypeSelectionSet,
  exportPrimitiveTypeSelectionSet,
  exportReactNodeTypeSelectionSet,
  exportRenderPropTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'

/**
 * These are required system types that other types reference
 */
export const exportSystemTypes = async (): Promise<ITypesExport> => {
  /**
   * Export all primitive types
   */
  const PrimitiveType = await Repository.instance.PrimitiveType

  const primitiveTypes = await PrimitiveType.find({
    options: {
      sort: [{ name: OGM_TYPES.SortDirection.Asc }],
    },
    selectionSet: exportPrimitiveTypeSelectionSet,
  })

  /**
   * React Node Type
   */
  const ReactNodeType = await Repository.instance.ReactNodeType

  // Only 1 here
  const reactNodeTypes = await ReactNodeType.find({
    options: {
      sort: [{ name: OGM_TYPES.SortDirection.Asc }],
    },
    selectionSet: exportReactNodeTypeSelectionSet,
  })

  /**
   * Render Props Type
   */
  const RenderPropType = await Repository.instance.RenderPropType

  // Only 1 here
  const renderPropTypes = await RenderPropType.find({
    options: {
      sort: [{ name: OGM_TYPES.SortDirection.Asc }],
    },
    selectionSet: exportRenderPropTypeSelectionSet,
  })

  /**
   * ActionType
   */
  const ActionType = await Repository.instance.ActionType

  const actionTypes = await ActionType.find({
    options: {
      sort: [{ name: OGM_TYPES.SortDirection.Asc }],
    },
    selectionSet: exportActionTypeSelectionSet,
  })

  /**
   * Here we create the interface dependency tree order
   *
   * Further to the front are closer to the leaf.
   */
  return {
    fields: [],
    types: [
      ...primitiveTypes,
      ...renderPropTypes,
      ...reactNodeTypes,
      ...actionTypes,
    ],
  } as ITypesExport
}
