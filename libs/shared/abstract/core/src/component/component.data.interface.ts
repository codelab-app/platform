import type { IComponentDto } from './component.dto.interface'

export type ICreateComponentData = Pick<IComponentDto, 'id' | 'name' | 'owner'>

export type IUpdateComponentData = Pick<IComponentDto, 'id' | 'name'>
