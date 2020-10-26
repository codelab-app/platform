export enum StateNameNode {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  EDITING = 'EDITING',
  CREATING = 'CREATING',
  CREATED = 'CREATED',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export interface StateSchemaNode {
  states: {
    [StateNameNode.IDLE]: object
    [StateNameNode.LOADING]: object
    [StateNameNode.LOADED]: object
    [StateNameNode.EDITING]: object
    [StateNameNode.CREATING]: object
    [StateNameNode.CREATED]: object
    [StateNameNode.ERROR]: object
    [StateNameNode.SUCCESS]: object
  }
}
