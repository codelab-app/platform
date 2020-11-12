import { EventObject } from 'xstate'

export enum EventNameApp {
  // Create
  START_CREATE = 'START_CREATE',
  // CANCEL_CREATE = 'CANCEL_CREATE',

  // Update
  START_EDIT = 'START_EDIT',
  // CANCEL_EDIT = 'CANCEL_EDIT',

  // Delete
  START_DELETE = 'START_DELETE',
  // CANCEL_DELETE = 'CANCEL_DELETE',

  CANCEL = 'CANCEL',

  CREATED_NODE = 'CREATED_NODE',
  EDITING_NODE = 'EDITING_NODE',
  EDITED_NODE = 'EDITED_NODE',

  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
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

export interface EventAppStartCreate extends EventObject {
  type: EventNameApp.START_CREATE
}

export interface EventAppStartEdit extends EventObject {
  type: EventNameApp.START_EDIT
}

export interface EventAppStartDelete extends EventObject {
  type: EventNameApp.START_DELETE
}

export interface EventAppCancel extends EventObject {
  event: EventNameApp.CANCEL
}

export interface EventAppSuccess extends EventObject {
  event: EventNameApp.SUCCESS
}

export interface EventAppError extends EventObject {
  event: EventNameApp.ERROR
}

export type EventApp =
  | EventAppStartCreate
  | EventAppStartEdit
  | EventAppStartDelete
  | EventAppCreateNode
  | EventAppEditedNode
  | EventAppEditingNode
  | EventAppCancel
  | EventAppSuccess
  | EventAppError
// Use event from another module
// | EventModal
