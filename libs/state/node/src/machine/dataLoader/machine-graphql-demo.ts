import { ApolloClient } from '@apollo/client'
import { createMachine } from 'xstate'
import { EventNameDataLoader } from './DataStreamEvents'
import { createDataStream } from './createDataStream'
import { queryVertices } from './queryVertices'

enum Action {
  notifyParent = 'notifyParent',
}

enum Service {
  dataStream = 'dataStream',
}

export const createGraphQLDemoMachine = (apolloClient: ApolloClient<any>) => {
  const observableFactory = createDataStream(
    queryVertices(apolloClient),
    'verticesDataStream',
  )

  return createMachine<any, any, any>(
    {
      id: `graph-ql-demo`,
      type: 'parallel',
      context: {},
      states: {
        'update-data': {
          initial: 'subscribed',
          states: {
            subscribed: {
              invoke: {
                src: Service.dataStream,
              },
              on: {
                [EventNameDataLoader.DATA_LOADED]: {
                  actions: [Action.notifyParent],
                },
              },
            },
          },
        },
        'modify-data': {
          // here we can create create states and events for modify data. We should use here only actions
        },
      },
    },
    {
      actions: {
        [Action.notifyParent]: () =>
          console.log('here we can pass data where we need or process them'),
      },
      services: {
        [Service.dataStream]: () => observableFactory(),
      },
    },
  )
}
