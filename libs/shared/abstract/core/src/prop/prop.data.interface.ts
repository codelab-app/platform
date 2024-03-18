import type { IPropData, IPropDto } from './prop.dto.interface'

export type ICreatePropData = IPropDto

export type IUpdatePropData = IPropDto

export interface IUpdatePropDataWithDefaultValues {
  data: IPropData
  defaultValues: IPropData | undefined
  id: string
}
