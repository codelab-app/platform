import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

export enum ActionType {
  None = 'None',
  Create = 'Create',
  Delete = 'Delete',
  Update = 'Update',
}

export enum EntityType {
  None = 'None',
  Page = 'Page',
  PageElement = 'PageElement',
  Atom = 'Atom',
  App = 'App',
  Style = 'Style',
  Library = 'Library',
  Component = 'Component',
  ComponentElement = 'ComponentElement',
  ChildComponentElement = 'ChildComponentElement',
  LinkedComponentElement = 'LinkedComponentElement',
  PropTypeC = 'PropTypeC',
}

interface CRUDModalState {
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
}

export const crudModalAtom = atom<CRUDModalState>({
  key: 'crud_modal',
  default: {
    ...defaultState,
  },
})

export const useCRUDModalForm = (type: EntityType) => {
  const [state, setState] = useRecoilState(crudModalAtom)

  const openCreateModal = useCallback(() => {
    setState((current) => ({
      ...current,
      type,
      visibleForm: ActionType.Create,
    }))
  }, [setState, type])

  const openUpdateModal = useCallback(
    (updateId: string) => {
      setState((current) => ({
        ...current,
        type,
        visibleForm: ActionType.Update,
        updateId,
      }))
    },
    [setState, type],
  )

  const openDeleteModal = useCallback(
    (deleteIds: Array<string>) => {
      setState((current) => ({
        ...current,
        type,
        visibleForm: ActionType.Delete,
        deleteIds,
      }))
    },
    [setState, type],
  )

  const reset = () => {
    setState({
      ...defaultState,
    })
  }

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
