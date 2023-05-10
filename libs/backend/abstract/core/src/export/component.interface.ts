import type { Component, Element } from '@codelab/backend/abstract/codegen'
import type { IInterfaceTypeDTO } from '@codelab/shared/abstract/core'
import type { ITypesExport } from './type.interface'

export type IComponentExport = Component

export interface IExportComponents {
  components: Array<Component>
}

/**
 * This type is used for exporting components individually
 * We need to export the types, api and descendant elements as well
 */
export type IComponentExportData = ITypesExport & {
  api: IInterfaceTypeDTO
  component: Component
  descendantElements: Array<Element>
}
