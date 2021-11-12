import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'
import { ActionType, EntityType } from './store/CrudModalState'

/**  @deprecated use createCrudSlice instead */
export interface CRUDModalStateRecoil {
  metadata: any
  deleteIds: Array<string>
  updateId: string
  visibleForm: ActionType
  type: EntityType
  loading: boolean
}

/**  @deprecated use createCrudSlice instead */
export const defaultState = {
  visibleForm: ActionType.None,
  type: EntityType.None,
  loading: false,
  deleteIds: [],
  updateId: '',
  metadata: undefined,
}

/**
 * The base state for a crud modal. Use useCrudModalState or useMutationCrudForm for a simpler API
 * @deprecated use createCrudSlice instead
 */
export const crudModalAtom = atom<CRUDModalStateRecoil>({
  key: 'crud_modal',
  default: {
    ...defaultState,
  },
})

/**
 * Data and methods returned from {@link useCrudModalForm}
 * @deprecated use createCrudSlice instead
 */
export interface UseCRUDModalFormData {
  /**
   * Opens the modal associated with {@link ActionType.Create} for the provided {@link EntityType}
   * Pass any data you might need in the modal as metadata
   */
  openCreateModal: (metadata?: any) => void

  /**
   * Opens the modal associated with {@link ActionType.Update} for the provided {@link EntityType}
   * Pass any data you might need in the modal as metadata (usually the updated model)
   */
  openUpdateModal: (updateId: string, metadata?: any) => void

  /**
   * Opens the modal associated with {@link ActionType.Delete} for the provided {@link EntityType}
   * Pass any data you might need in the modal as metadata (usually the deleted model)
   */
  openDeleteModal: (deleteIds: Array<string>, metadata?: any) => void

  /** Resets the modal state to the default one */
  reset: () => void

  /** Sets the loading modal state property */
  setLoading: (loading: boolean) => void

  /** Reference to the current modal state */
  state: CRUDModalStateRecoil
}

/**
 * Hook used for managing the state of a CRUD modal with a specific EntityType
 * @deprecated use createCrudSlice instead
 */
export const useCrudModalForm = (type: EntityType): UseCRUDModalFormData => {
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
