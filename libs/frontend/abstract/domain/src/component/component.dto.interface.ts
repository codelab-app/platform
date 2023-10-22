import type { IComponentDTO, IRef } from '@codelab/shared/abstract/core'

export type ICreateComponentData = Pick<
  IComponentDTO,
  'id' | 'keyGenerator' | 'name'
> & {
  rootElement?: IRef
}

export type IUpdateComponentData = Pick<
  IComponentDTO,
  'childrenContainerElement' | 'id' | 'keyGenerator' | 'name'
>
