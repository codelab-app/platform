export type AppActionType = CRUDActionType | `${ImportAppActionType.Import}`

export type AdminActionType =
  | CRUDActionType
  | `${ExecuteCommandActionType.Execute}`

export enum ImportAppActionType {
  Import = 'Import',
}

export enum ExecuteCommandActionType {
  Execute = 'Execute',
}

export enum CRUDActionType {
  None = 'None',
  Create = 'Create',
  Delete = 'Delete',
  Update = 'Update',
}

export interface CRUDModalState<TEntity, TActionType = CRUDActionType> {
  entity?: TEntity
  deleteIds: Array<string>
  updateId: string
  actionType: TActionType
}

export type OpenDeleteModalActionPayload<TEntity> = {
  deleteIds: Array<string>
  entity?: TEntity
}

export type OpenUpdateModalActionPayload<TEntity> = {
  updateId: string
  entity?: TEntity
}
