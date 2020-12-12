import { StateSchema } from 'xstate'
import { ContextNode } from './machine-node--context'

export enum StateNameNode {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  EDITING = 'EDITING',
  EDIT_SUBMITTING = 'EDIT_SUBMITING',
  EDITED = 'EDITED',
  CREATING = 'CREATING',
  CREATED = 'CREATED',
  DELETED = 'DELETED',
  DELETING = 'DELETING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export interface StateSchemaNode<T = ContextNode> extends StateSchema<T> {
  states: {
    [StateNameNode.IDLE]: StateSchema<T>
    [StateNameNode.LOADING]: StateSchema<T>
    [StateNameNode.LOADED]: StateSchema<T>
    [StateNameNode.EDITING]: StateSchema<T>
    [StateNameNode.EDIT_SUBMITTING]: StateSchema<T>
    [StateNameNode.EDITED]: StateSchema<T>
    [StateNameNode.CREATING]: StateSchema<T>
    [StateNameNode.CREATED]: StateSchema<T>
    [StateNameNode.DELETING]: StateSchema<T>
    [StateNameNode.DELETED]: StateSchema<T>
    [StateNameNode.ERROR]: StateSchema<T>
    [StateNameNode.SUCCESS]: StateSchema<T>
  }
}
