import { useMemo } from 'react'
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

  const openCreatePage = () => {
    setState((current) => ({
      ...current,
      type,
      visibleForm: FormType.Create,
      id: '',
    }))
  }

  const openUpdatePage = (id: string) => {
    setState((current) => ({
      ...current,
      type,
      visibleForm: FormType.Update,
      id,
    }))
  }

  const openDeletePage = (id: string) => {
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
    openCreatePage,
    openUpdatePage,
    openDeletePage,
    reset,
    state,
    setLoading,
  }
}
