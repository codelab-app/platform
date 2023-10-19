import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

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

export const IRestFetchConfigData = Type.Object({
  body: Typebox.Nullish(Type.String()),
  headers: Typebox.Nullish(Type.String()),
  method: Type.Enum(HttpMethod),
  queryParams: Typebox.Nullish(Type.String()),
  responseType: Type.Enum(HttpResponseType),
  urlSegment: Type.String(),
})

export type IRestFetchConfigData = Static<typeof IRestFetchConfigData>

export const IGraphQLFetchConfigData = Type.Object({
  headers: Typebox.Nullish(Type.String()),
  query: Type.String(),
  variables: Typebox.Nullish(Type.String()),
})

export type IGraphQLFetchConfigData = Static<typeof IGraphQLFetchConfigData>

export const IResourceFetchResponse = Type.Object({
  data: Typebox.Nullish(Type.Any()),
  error: Typebox.Nullish(Type.Any()),
  headers: Typebox.Nullish(Type.Record(Type.String(), Type.Any())),
  status: Typebox.Nullish(Type.Number()),
  statusText: Typebox.Nullish(Type.String()),
})

export type IResourceFetchResponse = Static<typeof IResourceFetchResponse>

export const IResourceFetchConfigData = Type.Union([
  IRestFetchConfigData,
  IGraphQLFetchConfigData,
])

export type IResourceFetchConfig = Static<typeof IResourceFetchConfigData>
