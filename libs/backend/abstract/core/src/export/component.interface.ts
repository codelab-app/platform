import type { Component, Element } from '@codelab/backend/abstract/codegen'
import type { IInterfaceTypeDTO } from '@codelab/shared/abstract/core'
import type { ITypesExport } from './type.interface'

export type IComponentExport = Component

export interface IExportComponents {
  components: Array<Component>
}

export type IComponentExportData = ITypesExport & {
  api: IInterfaceTypeDTO
  component: Component
  descendantElements: Array<Element>
}
