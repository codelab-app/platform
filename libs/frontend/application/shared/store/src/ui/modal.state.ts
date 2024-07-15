import type { ModelActionKey } from '@codelab/frontend/abstract/types'
import { atom, useAtom } from 'jotai'

interface ModalState<T = unknown> {
  data?: T
  isOpen: boolean
}

interface ModalsAtom<T> {
  [key: string]: ModalState<T>
}

const modalsAtom = atom({})

const useModalState = <T>(key: ModelActionKey) => {
  const [modalState, setModalState] = useAtom<ModalsAtom<T>>(modalsAtom)

  const open = (data?: T) => {
    setModalState((state) => ({
      ...state,
      [key]: { data, isOpen: true },
    }))
  }

  const close = () => {
    setModalState((state) => ({
      ...state,
      [key]: { data: undefined, isOpen: false },
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
