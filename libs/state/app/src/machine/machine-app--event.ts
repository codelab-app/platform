import { EventObject } from 'xstate'

export enum EventNameApp {
  CREATED_NODE = 'CREATED_NODE',
  EDITING_NODE = 'EDITING_NODE',
  EDITED_NODE = 'EDITED_NODE',
}

export interface EventAppCreateNode extends EventObject {
  type: EventNameApp.CREATED_NODE
}

export interface EventAppEditingNode extends EventObject {
  type: EventNameApp.EDITING_NODE
}
export interface EventAppEditedNode extends EventObject {
  type: EventNameApp.EDITED_NODE
}

export type EventApp =
  | EventAppCreateNode
  | EventAppEditedNode
  | EventAppEditingNode
