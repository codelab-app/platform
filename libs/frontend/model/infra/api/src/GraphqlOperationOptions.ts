import type { RequestInit } from 'graphql-request/dist/types.dom'

export interface GraphqlOperationOptions<
  TVariables extends Record<string, any> = Record<string, any>,
> extends Omit<RequestInit, 'body'> {
  variables?: TVariables
}
