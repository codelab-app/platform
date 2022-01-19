export type AppActionType = CRUDActionType | `${ImportAppActionType.Import}`

export enum ImportAppActionType {
  Import = 'Import',
}

/**
 * Use literal for easier composition
 */
// export type CRUDActionType =
//   | `${CRUDActionTypeKind.None}`
//   | `${CRUDActionTypeKind.Create}`
//   | `${CRUDActionTypeKind.Delete}`
//   | `${CRUDActionTypeKind.Update}`

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
