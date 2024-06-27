import type { ModelActionKey } from '@codelab/frontend/abstract/types'
import { atom, useAtom } from 'jotai'

interface ModalState<T = unknown> {
  data: T | null
  isOpen: boolean
}

interface ModalsAtom {
  [key: string]: ModalState
}

const modalsAtom = atom<ModalsAtom>({})

const useModalState = <T>(key: ModelActionKey) => {
  const [modalState, setModalState] = useAtom(modalsAtom)

  const open = (data: T) => {
    setModalState((state) => ({
      ...state,
      [key]: { data, isOpen: true },
    }))
  }

  const close = () => {
    setModalState((state) => ({
      ...state,
      [key]: { data: null, isOpen: false },
    }))
  }

  return {
    close,
    data: modalState[key]?.data,
    isOpen: modalState[key]?.isOpen,
    modalState: modalState[key],
    open,
  }
}

export { useModalState }
