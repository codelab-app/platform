import type { Component, Element } from '@codelab/backend/abstract/codegen'
import type { ITypesExport } from './type.interface'

export type IComponentExport = Component

export interface IExportComponents {
  components: Array<Component>
}

/**
 * This type is used for exporting components individually
 * We need to export the types and descendant elements as well
 */
export type IComponentExportData = ITypesExport & {
  component: Component
  descendantElements: Array<Element>
}
