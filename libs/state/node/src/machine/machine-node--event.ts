import { EventObject } from 'xstate'

export enum EventNameNode {
  LOAD = 'LOAD',
  NODE_CREATE = 'NODE_CREATE',
}

export interface EventNode extends EventObject {
  type: EventNameNode
  payload?: any // TODO: create own EventObject with payload
}
