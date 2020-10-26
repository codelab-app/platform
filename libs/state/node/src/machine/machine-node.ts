import { Machine, assign, sendParent } from 'xstate'
import { ContextNode } from './machine-node--context'
import { EventNameNode, EventNode } from './machine-node--event'
import { StateNameNode, StateSchemaNode } from './machine-node--state'
import { NodeService as NodeServiceEntity } from '@codelab/core/node'
import { EventNameApp } from '@codelab/state/app'

export const createMachineNode = (nodeService: NodeServiceEntity) => {
  return Machine<ContextNode, StateSchemaNode, EventNode>({
    id: 'node',
    initial: StateNameNode.LOADING,
    context: {
      nodes: [],
      node: null,
      nodeService,
    },
    states: {
      [StateNameNode.IDLE]: {
        on: {
          [EventNameNode.NODE_CREATE]: {
            target: StateNameNode.CREATING,
          },
        },
      },
      [StateNameNode.LOADING]: {
        invoke: {
          id: 'getNodes',
          src: (ctx, event) =>
            new Promise((resolve, reject) => {
              ctx.nodeService.getNodes(resolve)
            }),
          onDone: {
            target: StateNameNode.LOADED,
          },
        },
      },
      [StateNameNode.LOADED]: {
        entry: [
          assign<any, any>({
            nodes: (ctx: any, event: any) => {
              return [...event.data]
            },
          }),
        ],
        always: StateNameNode.IDLE,
      },
      [StateNameNode.EDITING]: {},
      [StateNameNode.CREATING]: {
        invoke: {
          id: 'creating_node',
          src: (ctx, event) =>
            new Promise((resolve, reject) => {
              ctx.nodeService.createNode(event.payload, resolve)
            }),
          onDone: {
            target: StateNameNode.CREATED,
          },
        },
      },
      [StateNameNode.CREATED]: {
        entry: [
          assign<any, any>({
            nodes: (ctx: any, event: any) => {
              return [...ctx.nodes, { ...event.data, key: event.data.id }]
            },
          }),
          sendParent((ctx, event) => ({
            type: EventNameApp.CREATED_NODE,
            payload: event.payload,
          })),
        ],
        always: StateNameNode.IDLE,
      },
      [StateNameNode.ERROR]: {},
      [StateNameNode.SUCCESS]: {},
    },
  })
}
