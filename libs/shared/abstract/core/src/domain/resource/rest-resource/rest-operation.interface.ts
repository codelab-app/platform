import { HttpMethod } from './http-method.enum'

export interface IRestOperationConfig {
  body: string
  method: HttpMethod
  queryParams: string
}
