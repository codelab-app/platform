import { Nullable } from '@codelab/shared/abstract/types'
import type { RequestInit } from 'graphql-request/dist/types.dom'

export enum API_ENV {
  // production = 'production',
  local = 'local',
}

export interface GraphqlOperationOptions<
  TVariables extends Record<string, any> = Record<string, any>,
> extends Pick<RequestInit, 'headers'> {
  variables?: Nullable<TVariables>
  context?: {
    env?: API_ENV
  }
}
