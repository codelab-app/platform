export enum StateNameNode {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  EDITING = 'EDITING',
  CREATING = 'CREATING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export interface StateSchemaNode {
  states: {
    [StateNameNode.IDLE]: object
    [StateNameNode.LOADING]: object
    [StateNameNode.EDITING]: object
    [StateNameNode.CREATING]: object
    [StateNameNode.ERROR]: object
    [StateNameNode.SUCCESS]: object
  }
}
