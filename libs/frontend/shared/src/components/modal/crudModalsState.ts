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
  Atom = 'Atom',
  App = 'App',
  Style = 'Style',
  Library = 'Library',
  Component = 'Component',
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

  const openCreateModal = () => {
    setState((current) => ({
      ...current,
      type,
      visibleForm: ActionType.Create,
      id: '',
    }))
  }

  const openUpdateModal = (id: string) => {
    setState((current) => ({
      ...current,
      type,
      visibleForm: ActionType.Update,
      id,
    }))
  }

  const openDeleteModal = (id: string) => {
    setState((current) => ({
      ...current,
      type,
      visibleForm: ActionType.Delete,
      id,
    }))
  }

  const reset = () => {
    setState({
      ...defaultState,
    })
  }

  const setLoading = (loading: boolean) => {
    setState((current) => ({
      ...current,
      loading,
    }))
  }

  return {
    openCreateModal,
    openUpdateModal,
    openDeleteModal,
    reset,
    state,
    setLoading,
  }
}
