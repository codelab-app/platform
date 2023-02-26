export interface IGraphQLResourceConfigDTO {
  id: string
  data: IGraphQLResourceConfigData
}

export interface IGraphQLResourceConfigData {
  url: string
  headers: string
}
