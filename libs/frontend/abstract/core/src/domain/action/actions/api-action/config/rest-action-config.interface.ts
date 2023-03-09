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
  Text = 'text',
  Stream = 'stream',
}

export interface IRestActionConfig {
  body?: Nullable<string>
  method: HttpMethod
  queryParams?: Nullable<string>
  headers?: Nullable<string>
  urlSegment: string
  responseType: HttpResponseType
}
