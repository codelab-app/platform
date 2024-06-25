import type { IRef } from '../model/ref.interface'
import type { IComponentDto } from './component.dto.interface'

export type ICreateComponentData = Pick<IComponentDto, 'id' | 'name'> & {
  rootElement?: IRef
}

export type IUpdateComponentData = Pick<IComponentDto, 'id' | 'name'>
