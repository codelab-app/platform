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

const modalStateAtom = atom<ModalState>({
  data: null,
  isOpen: false,
  key: null,
})

const useModalState = <T>(key: ModelActionKey) => {
  const [modalState, setModalState] = useAtom(modalStateAtom)

  const openModal = (data: T) => {
    setModalState({
      data,
      isOpen: true,
      key,
    })
  }

  const closeModal = () => {
    setModalState({
      data: null,
      isOpen: false,
      key: null,
    })
  }

  return {
    closeModal,
    isOpen: modalState.isOpen,
    modalState,
    openModal,
  }
}

export { useModalState }
