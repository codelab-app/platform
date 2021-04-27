import { atom, useRecoilState } from 'recoil'
import { useCallback } from 'react'

export enum ActionType {
  None = 'None',
  Create = 'Create',
  Delete = 'Delete',
  Update = 'Update',
}

export enum EntityType {
  None = 'None',
  Page = 'Page',
  Atom = 'Atom',
  App = 'App',
  Style = 'Style',
  Library = 'Library',
  Component = 'Component',
  ComponentElement = 'ComponentElement',
  LinkedComponentElement = 'LinkedComponentElement',
}

interface CRUDModalState {
  id: string
  visibleForm: ActionType
  type: EntityType
  loading: boolean
}

const defaultState = {
  visibleForm: ActionType.None,
  type: EntityType.None,
  loading: false,
  id: '',
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
      id: '',
    }))
  }, [setState, type])

  const openUpdateModal = useCallback(
    (id: string) => {
      setState((current) => ({
        ...current,
        type,
        visibleForm: ActionType.Update,
        id,
      }))
    },
    [setState, type],
  )

  const openDeleteModal = useCallback(
    (id: string) => {
      setState((current) => ({
        ...current,
        type,
        visibleForm: ActionType.Delete,
        id,
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
