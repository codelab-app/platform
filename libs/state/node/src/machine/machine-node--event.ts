import { EventObject } from 'xstate'
import { NodeA } from '@codelab/shared/interface/node'

export enum EventNameNode {
  NODE_CREATE = 'NODE_CREATE',
  NODE_DELETE = 'NODE_DELETE',
  NODE_EDIT = 'NODE_EDIT',
  NODE_EDIT_CANCEL = 'NODE_EDIT_CANCEL',
  NODE_EDIT_SUBMIT = 'NODE_EDIT_SUBMIT',
}

export interface EventNodeCreate extends EventObject {
  type: EventNameNode.NODE_CREATE
  payload: NodeA
}
export interface EventNodeDelete extends EventObject {
  type: EventNameNode.NODE_DELETE
  payload: NodeA['id']
}
export interface EventNodeEdit extends EventObject {
  type: EventNameNode.NODE_EDIT
  payload: NodeA['id']
}
export interface EventNodeEditCancel extends EventObject {
  type: EventNameNode.NODE_EDIT_CANCEL
}
export interface EventNodeEditSubmit extends EventObject {
  type: EventNameNode.NODE_EDIT_SUBMIT
  payload: NodeA
}
export type EventNode =
  | EventNodeCreate
  | EventNodeDelete
  | EventNodeEdit
  | EventNodeEditCancel
  | EventNodeEditSubmit
