import { ApolloClient } from '@apollo/client'
import { merge } from 'rxjs'
import { actions, assign, createMachine } from 'xstate'
import { EventNameDataStream } from '../DataStreamEvents'
import { createDataStream } from '../createDataStream'
import { createEdgeMutation } from './createEdge'
import { createVertexMutation } from './createVertex'
import { queryEdges } from './queryEdges'
import { queryVertices } from './queryVertices'

enum Action {
  notifyParent = 'notifyParent',
  createVertix = 'createVertix',
  createEdge = 'createEdge',
  updateData = 'updateData',
}

enum Service {
  dataStream = 'dataStream',
}

enum EventNameModifyData {
  'CreateVertex' = 'CreateVertex',
  'CreateEdge' = 'CreateEdge',
}

enum DataStreamId {
  'verticesDataStream' = 'verticesDataStream',
  'edgesDataStream' = 'edgesDataStream',
}

export const createGraphQLDemoMachine = (apolloClient: ApolloClient<any>) => {
  const verticesDataStream = createDataStream(
    queryVertices(apolloClient),
    DataStreamId.verticesDataStream,
  )

  const edgesDataStream = createDataStream(
    queryEdges(apolloClient),
    DataStreamId.edgesDataStream,
  )

  const dataStream = () => merge(verticesDataStream(), edgesDataStream())

  const createVertex = createVertexMutation(apolloClient)
  const createEdge = createEdgeMutation(apolloClient)

  return createMachine<any, any, any>(
    {
      id: `graph-ql-demo`,
      type: 'parallel',
      context: {
        vertices: [],
        edges: [],
      },
      states: {
        'update-data': {
          initial: 'subscribed',
          states: {
            subscribed: {
              invoke: {
                src: Service.dataStream,
              },
              on: {
                [EventNameDataStream.DATA_LOADED]: {
                  actions: [Action.updateData, Action.notifyParent],
                },
              },
            },
          },
        },
        'modify-data': {
          initial: 'idle',
          states: {
            idle: {
              on: {
                [EventNameModifyData.CreateVertex]: {
                  actions: Action.createVertix,
                },
                [EventNameModifyData.CreateEdge]: {
                  actions: Action.createEdge,
                },
              },
            },
          },
        },
      },
    },
    {
      actions: {
        [Action.updateData]: actions.choose([
          {
            cond: (ctx, event) => event.id === DataStreamId.verticesDataStream,
            actions: assign({
              vertices: (ctx, event) => event.data,
            }),
          },
          {
            cond: (ctx, event) => event.id === DataStreamId.edgesDataStream,
            actions: assign({
              edges: (ctx, event) => event.data,
            }),
          },
        ]),
        [Action.notifyParent]: () => {
          // console.log('here we can pass data where we need or process them'),
        },
        [Action.createVertix]: (context: any, event: any) =>
          createVertex(event.payload),
        [Action.createEdge]: (context: any, event: any) =>
          createEdge(event.payload),
      },
      services: {
        [Service.dataStream]: () => dataStream(),
      },
    },
  )
}
