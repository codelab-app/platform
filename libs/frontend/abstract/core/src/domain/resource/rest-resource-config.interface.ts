import type { IBaseResourceConfigData } from './resource.dto.interface'

export interface IRestResourceConfigDTO {
  id: string
  data: IRestResourceConfigData
}

export type IRestResourceConfigData = IBaseResourceConfigData
