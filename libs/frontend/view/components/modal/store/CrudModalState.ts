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

export enum EntityType {
  Tag = 'Tag',
  User = 'User',
  None = 'None',
  Page = 'Page',
  Element = 'Element',
  Atom = 'Atom',
  AtomType = 'AtomType',
  App = 'App',
  Style = 'Style',
  Library = 'Library',
  Lambda = 'Lambda',
  Component = 'Component',
  ComponentElement = 'ComponentElement',
  Prop = 'Prop',
  Type = 'Type',
  Field = 'Field',
  Hook = 'Hook',
  PropMapBinding = 'PropMapBinding',
}

export interface CRUDModalState<TEntity> {
  entity?: TEntity
  deleteIds: Array<string>
  updateId: string
  actionType: ActionType
  loading: boolean
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
  Reducers extends SliceCaseReducers<CRUDModalState<TEntity>>,
>(
  name: string,
  initialState: CRUDModalState<TEntity>,
  reducers: ValidateSliceCaseReducers<CRUDModalState<TEntity>, Reducers>,
) =>
  createSlice({
    name,
    initialState,
    reducers: {
      openCreateModal: (state: TState): TState => ({
        ...state,
        formAction: ActionType.Create,
        entity: {},
      }),
      openUpdateModal: (
        state: TState,
        { payload }: PayloadAction<OpenUpdateModalActionPayload<TEntity>>,
      ): TState => ({
        ...state,
        entity: payload.entity,
        updateId: payload.updateId,
        formAction: ActionType.Update,
      }),
      openDeleteModal: (
        state: TState,
        { payload }: PayloadAction<OpenDeleteModalActionPayload<TEntity>>,
      ): TState => ({
        ...state,
        entity: payload.entity,
        deleteIds: payload.deleteIds,
        formAction: ActionType.Delete,
      }),
      setLoading: (
        state: TState,
        { payload }: PayloadAction<boolean>,
      ): TState => ({
        ...state,
        isLoading: payload,
      }),
      reset: () => initialState,
      resetModal: (s) => ({
        ...s,
        loading: false,
        formAction: ActionType.None,
        entity: undefined,
        deleteIds: [],
        updateId: '',
      }),
      ...reducers,
    },
  })

export type CRUDSlice = ReturnType<typeof createCrudSlice>
export type CRUDActions = ReturnType<typeof createCrudSlice>['actions']

export const initialCrudState: CRUDModalState<any> = {
  actionType: ActionType.None,
  loading: false,
  deleteIds: [],
  updateId: '',
  entity: undefined,
}
