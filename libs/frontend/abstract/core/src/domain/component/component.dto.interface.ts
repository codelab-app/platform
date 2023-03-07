import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { IOwnerSchema } from '../user'

export interface IComponentDTO extends IOwnerSchema {
  id: string
  name: string
  rootElement: IEntity
  api: IEntity
  props?: IEntity | null
  childrenContainerElement: IEntity
}

export type ICreateComponentData = IComponentDTO & IOwnerSchema

export type IUpdateComponentData = Pick<
  ICreateComponentData,
  'id' | 'name' | 'childrenContainerElement'
>

export type IComponentExport = OGM_TYPES.Component

export type IComponentID = string
