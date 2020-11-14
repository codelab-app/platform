import { QueryResult } from '@apollo/client'
import { EventObject } from 'xstate'
import { EntityA, EntityI } from '@codelab/shared/interface/entity'

export enum EventNameEntity {
  // START_CREATE = 'START_CREATE',
  // START_EDIT = 'START_EDIT',
  // START_DELETE = 'START_DELETE',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  FETCH = 'FETCH',
}

export interface EventEntitySuccess<
  TApolloQueryResult extends QueryResult = any
> extends EventObject {
  type: EventNameEntity.SUCCESS
  results: TApolloQueryResult
}

export interface EventEntityFailure extends EventObject {
  type: EventNameEntity.FAILURE
}

export interface EventEntityFetch extends EventObject {
  type: EventNameEntity.FETCH
}

export type EventEntity<I extends EntityI, A extends EntityA> =
  | EventEntitySuccess<QueryResult>
  | EventEntityFailure
  | EventEntityFetch
