import type { RequestInit } from 'graphql-request/dist/types.dom'

export interface GraphqlOperationOptions<
  TVariables extends Record<string, any> = Record<string, any>,
> extends Pick<RequestInit, 'headers'> {
  variables?: TVariables | null
}
