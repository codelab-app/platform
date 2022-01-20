import {
  CRUDActionType,
  CRUDModalState,
  OpenDeleteModalActionPayload,
  OpenUpdateModalActionPayload,
} from '@codelab/frontend/abstract/core'
import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit'

export const createCrudSlice = <
  TEntity,
  TState extends CRUDModalState<TEntity, TActionType>,
  Reducers extends SliceCaseReducers<TState>,
  TActionType,
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
        actionType: CRUDActionType.Create,
        entity: undefined,
      }),
      openUpdateModal: (
        state,
        { payload }: PayloadAction<OpenUpdateModalActionPayload<TEntity>>,
      ) => ({
        ...state,
        entity: payload.entity,
        updateId: payload.updateId,
        actionType: CRUDActionType.Update,
      }),
      openDeleteModal: (
        state,
        { payload }: PayloadAction<OpenDeleteModalActionPayload<TEntity>>,
      ) => ({
        ...state,
        entity: payload.entity,
        deleteIds: payload.deleteIds,
        actionType: CRUDActionType.Delete,
      }),
      reset: () => initialState,
      resetModal: (s) => {
        return {
          ...s,
          actionType: CRUDActionType.None,
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
  actionType: CRUDActionType.None,
  deleteIds: [],
  updateId: '',
  entity: undefined,
}
