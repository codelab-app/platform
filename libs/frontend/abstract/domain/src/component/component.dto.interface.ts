import type { IComponentDTO } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

export type ICreateComponentData = Pick<
  IComponentDTO,
  'id' | 'keyGenerator' | 'name'
> & {
  rootElement?: IEntity
}

export type IUpdateComponentData = Pick<
  IComponentDTO,
  'childrenContainerElement' | 'id' | 'keyGenerator' | 'name'
>
