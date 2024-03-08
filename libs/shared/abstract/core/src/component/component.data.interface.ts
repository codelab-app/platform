import type { IRef } from '../model/node-type.interface'
import type { IComponentDto } from './component.dto.interface'

export type ICreateComponentData = Pick<IComponentDto, 'id' | 'name'> & {
  rootElement?: IRef
}

export type IUpdateComponentData = Pick<
  IComponentDto,
  'childrenContainerElement' | 'id' | 'name'
>
