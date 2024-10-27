import type { IPropData, IPropDto } from './prop.dto.interface'

export type IPropCreateData = IPropDto

export type IPropUpdateData = IPropDto

export interface IUpdatePropDataWithDefaultValues {
  data: IPropData
  defaultValues: IPropData | undefined
  id: string
}
