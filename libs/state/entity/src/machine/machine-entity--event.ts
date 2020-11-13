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

export interface EventEntitySuccess<A extends EntityA> extends EventObject {
  type: EventNameEntity.SUCCESS
  data: any
  // data: A
}

export interface EventEntityFailure extends EventObject {
  type: EventNameEntity.FAILURE
}

export interface EventEntityFetch extends EventObject {
  type: EventNameEntity.FETCH
}

export type EventEntity<I extends EntityI, A extends EntityA> =
  | EventEntitySuccess<A>
  | EventEntityFailure
  | EventEntityFetch
