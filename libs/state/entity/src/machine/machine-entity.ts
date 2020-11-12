import { map } from 'rxjs/operators'
import { Machine, assign, send } from 'xstate'
import { ContextEntity } from './machine-entity--context'
import {
  EventEntity,
  EventEntitySuccess,
  EventNameEntity,
} from './machine-entity--event'
import { StateNameEntity, StateSchemaEntity } from './machine-entity--state'
import { EntityA, EntityI } from '@codelab/shared/interface/entity'
import { watchQuery } from '@codelab/shared/utils'
import { GraphsDocument } from '@codelab/state/apollo'
import { getApolloClient } from '@codelab/ui/hoc'

const vertices$ = watchQuery(getApolloClient(), {
  query: GraphsDocument,
  context: {
    clientName: 'hasura',
  },
})

export enum ActionsEntity {
  ASSIGN_ITEM = 'ASSIGN_ITEM',
  ASSIGN_LIST = 'ASSIGN_LIST',
  FETCH_DATA = 'FETCH_DATA',
}

export const createMachineEntity = <I extends EntityI, A extends EntityA>() =>
  Machine<ContextEntity<I, A>, StateSchemaEntity<I, A>, EventEntity<I, A>>(
    {
      id: 'entity',
      initial: StateNameEntity.IDLE,
      context: {
        current: undefined,
        item: undefined,
        list: [],
      },
      states: {
        [StateNameEntity.IDLE]: {
          entry: () => {
            console.log('idle')
          },
          // entry: [send(StateNameEntity.FETCHING)],
          on: {
            '': {
              target: StateNameEntity.FETCHING,
            },
          },
        },
        [StateNameEntity.FETCHING]: {
          entry: [ActionsEntity.FETCH_DATA],
          invoke: {
            src: (context, event) => {
              return vertices$.pipe(
                map((value: any) => {
                  const {
                    data: { graph },
                  } = value

                  return {
                    type: EventNameEntity.SUCCESS,
                    data: graph,
                  }
                }),
                // delay(2),
              )
            },
            // target: StateNameEntity.FETCHING,
          },
          on: {
            [EventNameEntity.SUCCESS]: {
              actions: [ActionsEntity.ASSIGN_LIST],
            },
          },
          // entry: [ActionsEntity.FETCH_DATA],
        },
        [StateNameEntity.LOADED]: {
          entry: () => {
            console.log('loaded')
          },
        },
        [StateNameEntity.CREATING]: {},
        [StateNameEntity.EDITING]: {},
      },
    },
    {
      actions: {
        [ActionsEntity.FETCH_DATA]: () => {
          console.log('fetch data')

          return send(EventNameEntity.FETCH)
        },
        [ActionsEntity.ASSIGN_LIST]: assign({
          list: (context, event) => {
            const { data } = event as EventEntitySuccess

            console.log(data)

            return data
          },
        }),
        loadData: assign({
          item: (context, event) => {
            return Promise.resolve({
              id: 'vertex-id',
              label: 'My Vertex',
            })
          },
        }),
      },
      services: {
        loadData: () => vertices$,
      },
    },
  )
