import { EventObject } from 'xstate'

export enum EventNameNode {
  LOAD = 'LOAD',
}

export interface EventNode extends EventObject {
  type: EventNameNode.LOAD
}
