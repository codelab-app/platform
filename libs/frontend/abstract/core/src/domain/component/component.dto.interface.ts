import type { IOwner } from '@codelab/shared/abstract/core'
import type { IEntity, Nullish } from '@codelab/shared/abstract/types'

export interface IComponentDTO extends IOwner {
  api: IEntity
  childrenContainerElement: IEntity
  id: string
  keyGenerator: Nullish<string>
  name: string
  props: IEntity
  rootElement: IEntity
  store: IEntity
}

export type ICreateComponentData = Pick<
  IComponentDTO,
  'id' | 'keyGenerator' | 'name' | 'owner'
>

export type IUpdateComponentData = Pick<
  IComponentDTO,
  'childrenContainerElement' | 'id' | 'keyGenerator' | 'name'
>
