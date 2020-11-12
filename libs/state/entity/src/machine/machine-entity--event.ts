import { EventObject } from 'xstate'

export enum EventNameEntity {
  // START_CREATE = 'START_CREATE',
  // START_EDIT = 'START_EDIT',
  // START_DELETE = 'START_DELETE',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  FETCH = 'FETCH',
}

export interface EventEntitySuccess extends EventObject {
  type: EventNameEntity.SUCCESS
  data: any
}

export interface EventEntityFailure extends EventObject {
  type: EventNameEntity.FAILURE
}

export interface EventEntityFetch extends EventObject {
  type: EventNameEntity.FETCH
}

export type EventEntity =
  | EventEntitySuccess
  | EventEntityFailure
  | EventEntityFetch
