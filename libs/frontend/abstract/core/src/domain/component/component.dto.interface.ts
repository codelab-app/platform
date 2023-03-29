import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { IOwnerSchema } from '../user'

export interface IComponentDTO extends IOwnerSchema {
  api: IEntity
  childrenContainerElement: IEntity
  id: string
  name: string
  props: IEntity
  rootElement: IEntity
  store: IEntity
}

export type ICreateComponentData = IOwnerSchema &
  // Default store and props are added
  Omit<IComponentDTO, 'props' | 'store'>

export type IUpdateComponentData = Pick<
  ICreateComponentData,
  'childrenContainerElement' | 'id' | 'name'
>

export type IComponentExport = OGM_TYPES.Component

export type IComponentID = string
