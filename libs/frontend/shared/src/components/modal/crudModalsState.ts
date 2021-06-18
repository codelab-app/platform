import * as Apollo from '@apollo/client'
import {
  MutationFunctionOptions,
  MutationTuple,
} from '@apollo/client/react/types/types'
import { FetchResult } from 'apollo-link'
import { useCallback, useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'

export enum ActionType {
  None = 'None',
  Create = 'Create',
  Delete = 'Delete',
  Update = 'Update',
}

export enum EntityType {
  User = 'User',
  None = 'None',
  Page = 'Page',
  PageElement = 'PageElement',
  Atom = 'Atom',
  AtomType = 'AtomType',
  App = 'App',
  Style = 'Style',
  Library = 'Library',
  Component = 'Component',
  ComponentElement = 'ComponentElement',
  ChildComponentElement = 'ChildComponentElement',
  LinkedComponentElement = 'LinkedComponentElement',
  PropTypeC = 'PropTypeC',
  Prop = 'Prop',
  Interface = 'Interface',
  Field = 'Field',
}

interface CRUDModalState {
  metadata: any
  deleteIds: Array<string>
  updateId: string
  visibleForm: ActionType
  type: EntityType
  loading: boolean
}

const defaultState = {
  visibleForm: ActionType.None,
  type: EntityType.None,
  loading: false,
  deleteIds: [],
  updateId: '',
  metadata: undefined,
}

export const crudModalAtom = atom<CRUDModalState>({
  key: 'crud_modal',
  default: {
    ...defaultState,
  },
})

export const useCRUDModalForm = (
  type: EntityType,
): UseCRUDModalFormFunctions => {
  const [state, setState] = useRecoilState(crudModalAtom)

  const openCreateModal = useCallback(
    (metadata?: any) => {
      setState((current) => ({
        ...current,
        type,
        visibleForm: ActionType.Create,
        metadata: metadata || undefined,
      }))
    },
    [setState, type],
  )

  const openUpdateModal = useCallback(
    (updateId: string, metadata?: any) => {
      setState((current) => ({
        ...current,
        type,
        visibleForm: ActionType.Update,
        updateId,
        metadata: metadata || undefined,
      }))
    },
    [setState, type],
  )

  const openDeleteModal = useCallback(
    (deleteIds: Array<string>, metadata?: any) => {
      setState((current) => ({
        ...current,
        type,
        visibleForm: ActionType.Delete,
        deleteIds,
        metadata: metadata || undefined,
      }))
    },
    [setState, type],
  )

  const reset = useCallback(() => {
    setState({
      ...defaultState,
    })
  }, [setState])

  const setLoading = useCallback(
    (loading: boolean) => {
      setState((current) => ({
        ...current,
        loading,
      }))
    },
    [setState],
  )

  return {
    openCreateModal,
    openUpdateModal,
    openDeleteModal,
    reset,
    state,
    setLoading,
  }
}

export interface UseCRUDModalFormFunctions {
  openCreateModal: (metadata?: any) => void
  openUpdateModal: (updateId: string, metadata?: any) => void
  openDeleteModal: (deleteIds: Array<string>, metadata?: any) => void
  reset: () => void
  setLoading: (loading: boolean) => void
  state: CRUDModalState
}

export interface UseMutationCrudFormOptions<
  TMutation,
  TMutationVariables,
  TSubmitData,
> {
  entityType: EntityType
  mutationOptions?: Apollo.MutationHookOptions<TMutation, TMutationVariables>
  mutationFunctionOptions?: Omit<
    MutationFunctionOptions<TMutation, TMutationVariables>,
    'variables'
  >
  useMutationFunction: (
    baseOptions?: Apollo.MutationHookOptions<TMutation, TMutationVariables>,
  ) => MutationTuple<TMutation, TMutationVariables>
  mapVariables: (
    formData: TSubmitData,
    crudModalState: CRUDModalState,
  ) => TMutationVariables
}

export interface UseMutationCrudFormFunctions<
  TMutation,
  TMutationVariables,
  TSubmitData,
> {
  crudModal: UseCRUDModalFormFunctions
  mutate: MutationTuple<TMutation, TMutationVariables>[0]
  mutationData: MutationTuple<TMutation, TMutationVariables>[1]
  handleSubmit: (data: TSubmitData) => Promise<FetchResult<TMutation>>
}

export const useMutationCrudForm = <
  TSubmitData,
  TMutation,
  TMutationVariables,
>({
  entityType,
  useMutationFunction,
  mutationOptions,
  mapVariables,
  mutationFunctionOptions,
}: UseMutationCrudFormOptions<
  TMutation,
  TMutationVariables,
  TSubmitData
>): UseMutationCrudFormFunctions<
  TMutation,
  TMutationVariables,
  TSubmitData
> => {
  const crudModal = useCRUDModalForm(entityType)
  const { setLoading } = crudModal
  const [mutate, mutationData] = useMutationFunction(mutationOptions)
  const { loading } = mutationData

  useEffect(() => {
    setLoading(loading)
  }, [loading, setLoading])

  const handleSubmit = useCallback(
    (submitData: TSubmitData) => {
      return mutate({
        ...mutationFunctionOptions,
        variables: mapVariables(submitData, crudModal.state),
      })
    },
    [mapVariables, mutate, mutationFunctionOptions, crudModal.state],
  )

  return { crudModal, mutate, mutationData, handleSubmit }
}
