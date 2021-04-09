import { atom, useRecoilState } from 'recoil'

export enum FormType {
  None = 'None',
  Create = 'Create',
  Delete = 'Delete',
  Update = 'Update',
}

export enum EntityType {
  None = 'None',
  Page = 'Page',
  Atom = 'Atom'
}

interface CRUDModalState {
  id: string
  visibleForm: FormType
  type: EntityType
  loading: boolean
}

const DefaultState = {
  visibleForm: FormType.None,
  type: EntityType.None,
  loading: false,
  id: '',
}

export const crudModalAtom = atom<CRUDModalState>({
  key: 'crud_modal',
  default: {
    ...DefaultState,
  },
})

export const useCRUDModalForm = (type: EntityType) => {
  const [state, setState] = useRecoilState(crudModalAtom)

  const openCreateModal = () => {
    setState((current) => ({
      ...current,
      type,
      visibleForm: FormType.Create,
      id: '',
    }))
  }

  const openUpdateModal = (id: string) => {
    setState((current) => ({
      ...current,
      type,
      visibleForm: FormType.Update,
      id,
    }))
  }

  const openDeleteModal = (id: string) => {
    setState((current) => ({
      ...current,
      type,
      visibleForm: FormType.Delete,
      id,
    }))
  }
  const reset = () => {
    setState({
      ...DefaultState,
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
