import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit'

export enum ActionType {
  None = 'None',
  Create = 'Create',
  Delete = 'Delete',
  Update = 'Update',
}

export interface CRUDModalState<TEntity> {
  entity?: TEntity
  deleteIds: Array<string>
  updateId: string
  actionType: ActionType
}

export type OpenDeleteModalActionPayload<TEntity> = {
  deleteIds: Array<string>
  entity?: TEntity
}

export type OpenUpdateModalActionPayload<TEntity> = {
  updateId: string
  entity?: TEntity
}

export const createCrudSlice = <
  TEntity,
  TState extends CRUDModalState<TEntity>,
  Reducers extends SliceCaseReducers<TState>,
>(
  name: string,
  initialState: TState,
  reducers: ValidateSliceCaseReducers<TState, Reducers>,
) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      openCreateModal: (state) => ({
        ...state,
        actionType: ActionType.Create,
        entity: undefined,
      }),
      openUpdateModal: (
        state,
        { payload }: PayloadAction<OpenUpdateModalActionPayload<TEntity>>,
      ) => ({
        ...state,
        entity: payload.entity,
        updateId: payload.updateId,
        actionType: ActionType.Update,
      }),
      openDeleteModal: (
        state,
        { payload }: PayloadAction<OpenDeleteModalActionPayload<TEntity>>,
      ) => ({
        ...state,
        entity: payload.entity,
        deleteIds: payload.deleteIds,
        actionType: ActionType.Delete,
      }),
      reset: () => initialState,
      resetModal: (s) => {
        return {
          ...s,
          actionType: ActionType.None,
          entity: undefined,
          deleteIds: [],
          updateId: '',
        }
      },
      ...reducers,
    },
  })
}

export type CRUDSlice = ReturnType<typeof createCrudSlice>
export type CRUDActions = ReturnType<typeof createCrudSlice>['actions']

export const initialCrudState: CRUDModalState<any> = {
  actionType: ActionType.None,
  deleteIds: [],
  updateId: '',
  entity: undefined,
}
