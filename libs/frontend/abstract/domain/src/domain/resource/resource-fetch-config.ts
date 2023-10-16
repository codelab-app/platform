import type { Nullable } from '@codelab/shared/abstract/types'

export enum HttpMethod {
  DELETE = 'DELETE',
  GET = 'GET',
  HEAD = 'HEAD',
  OPTION = 'OPTION',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
}

export enum HttpResponseType {
  ArrayBuffer = 'arraybuffer',
  Blob = 'blob',
  Document = 'document',
  Json = 'json',
  Stream = 'stream',
  Text = 'text',
}

export interface IRestFetchConfig {
  body?: Nullable<string>
  headers?: Nullable<string>
  method: HttpMethod
  queryParams?: Nullable<string>
  responseType: HttpResponseType
  urlSegment: string
}

export interface IGraphQLFetchConfig {
  headers?: Nullable<string>
  query: string
  variables?: Nullable<string>
}

export type IResourceFetchConfig = IGraphQLFetchConfig | IRestFetchConfig
