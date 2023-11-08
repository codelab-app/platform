import type { IComponentDTO, IRef } from '@codelab/shared/abstract/core'

export type ICreateComponentData = Pick<IComponentDTO, 'id' | 'name'> & {
  rootElement?: IRef
}

export type IUpdateComponentData = Pick<
  IComponentDTO,
  'childrenContainerElement' | 'id' | 'name'
>
