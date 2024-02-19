import type { IComponentDto, IRef } from '@codelab/shared/abstract/core'

export type ICreateComponentData = Pick<IComponentDto, 'id' | 'name'> & {
  rootElement?: IRef
}

export type IUpdateComponentData = Pick<
  IComponentDto,
  'childrenContainerElement' | 'id' | 'name'
>
