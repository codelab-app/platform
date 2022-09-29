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
  body: string
  method: HttpMethod
  queryParams: string
  headers: string
  urlSegment: string
  responseType: HttpResponseType
}
