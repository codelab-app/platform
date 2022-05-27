export enum HttpMethod {
  DELETE = 'DELETE',
  GET = 'GET',
  HEAD = 'HEAD',
  OPTION = 'OPTION',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
}

export interface IRestOperationConfig {
  body: string
  method: HttpMethod
  queryParams: string
}
