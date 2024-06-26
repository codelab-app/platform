import type {
  MODEL_ACTION,
  ModelActionKey,
} from '@codelab/frontend/abstract/types'
import { atom, useAtom } from 'jotai'

interface ModalState<T = unknown> {
  data: T | null
  isOpen: boolean
  key: string | null
}

const createModalStateAtom = <T>() =>
  atom<ModalState<T>>({
    data: null,
    isOpen: false,
    key: null,
  })

const useModalState = <T>(key: ModelActionKey) => {
  const [modalState, setModalState] = useAtom(createModalStateAtom<T>())

  const open = (data: T) => {
    setModalState({
      data,
      isOpen: true,
      key,
    })
  }

  const close = () => {
    setModalState({
      data: null,
      isOpen: false,
      key: null,
    })
  }

  return {
    close,
    data: modalState.data,
    isOpen: modalState.isOpen,
    modalState,
    open,
  }
}

export { useModalState }
