import { Machine } from 'xstate'
import { ContextEntity } from './machine-entity--context'
import { EventEntity, EventNameEntity } from './machine-entity--event'
import { StateNameEntity, StateSchemaEntity } from './machine-entity--state'
import {
  ActionsEntity,
  EntityA,
  EntityI,
  ServicesEntity,
} from '@codelab/shared/interface/entity'
import { CustomMachineOptions } from '@codelab/shared/interface/machine'

export const createMachineEntity = <I extends EntityI, A extends EntityA>(
  config: CustomMachineOptions,
) =>
  Machine<ContextEntity<I, A>, StateSchemaEntity<I, A>, EventEntity<I, A>>({
    id: 'entity',
    initial: StateNameEntity.IDLE,
    context: {
      current: undefined,
      item: { data: null },
      list: { data: null },
    },
    states: {
      [StateNameEntity.IDLE]: {
        entry: () => {
          console.log('idle')
        },
        always: {
          target: StateNameEntity.FETCHING,
        },
      },
      [StateNameEntity.FETCHING]: {
        entry: [ActionsEntity.FETCH_DATA],
        invoke: {
          src: ServicesEntity.FETCH_LIST,
        },
        on: {
          [EventNameEntity.SUCCESS]: {
            actions: [ActionsEntity.ASSIGN_LIST],
            target: StateNameEntity.LOADED,
          },
        },
      },
      [StateNameEntity.LOADED]: {
        entry: () => {
          console.log('loaded')
        },
      },
      [StateNameEntity.CREATING]: {},
      [StateNameEntity.EDITING]: {},
    },
  }).withConfig(config)
