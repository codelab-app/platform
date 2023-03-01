import type { IBaseResourceConfigData } from './resource.dto.interface'

export interface IGraphQLResourceConfigDTO {
  id: string
  data: IGraphQLResourceConfigData
}

export type IGraphQLResourceConfigData = IBaseResourceConfigData
