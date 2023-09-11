import type { IComponentDTO } from '@codelab/shared/abstract/core'

export type ICreateComponentData = Pick<
  IComponentDTO,
  'id' | 'keyGenerator' | 'name'
>

export type IUpdateComponentData = Pick<
  IComponentDTO,
  'childrenContainerElement' | 'id' | 'keyGenerator' | 'name'
>
