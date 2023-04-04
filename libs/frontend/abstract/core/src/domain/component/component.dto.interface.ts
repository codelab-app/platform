import type { IOwner } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

export interface IComponentDTO extends IOwner {
  api: IEntity
  childrenContainerElement: IEntity
  id: string
  name: string
  props: IEntity
  rootElement: IEntity
  store: IEntity
}

export type ICreateComponentData = Pick<IComponentDTO, 'id' | 'name' | 'owner'>

export type IUpdateComponentData = Pick<
  IComponentDTO,
  'childrenContainerElement' | 'id' | 'name'
>
