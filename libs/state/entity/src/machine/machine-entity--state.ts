import { StateNodeConfig, StateSchema, StatesConfig } from 'xstate'
import { ContextEntity } from './machine-entity--context'
import { EventEntity } from './machine-entity--event'
import { EntityA, EntityI } from '@codelab/shared/interface/entity'

export enum StateNameEntity {
  IDLE = 'IDLE',
  FETCHING = 'FETCHING',
  LOADED = 'LOADED',
  CREATING = 'CREATING',
  EDITING = 'EDITING',
  DELETING = 'DELETING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  // INACTIVE = 'INACTIVE',
  // ACTIVE = 'ACTIVE',
}

export interface StateSchemaEntity<I extends EntityI, A extends EntityA>
  extends StateSchema<ContextEntity<I, A>> {
  states: {
    [StateNameEntity.IDLE]: StateNodeConfig<any, any, any>
    [StateNameEntity.FETCHING]: StateNodeConfig<any, any, any>
    [StateNameEntity.LOADED]: StateNodeConfig<any, any, any>
    [StateNameEntity.CREATING]: StateNodeConfig<any, any, any>
    [StateNameEntity.EDITING]: StateNodeConfig<any, any, any>
  }
}

export type StatesConfigEntity<
  I extends EntityI,
  A extends EntityA
> = StatesConfig<
  ContextEntity<I, A>,
  StateSchemaEntity<I, A>,
  EventEntity<I, A>
>
