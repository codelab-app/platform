import type { ModelActionKey } from '@codelab/frontend/abstract/types'
import { atom, useAtom } from 'jotai'
import { atomFamily } from 'jotai/utils'

interface ModalState<T = unknown> {
  data?: T
  isOpen: boolean
  key: ModelActionKey
}

/**
 * atom family is used for dynamic atoms
 */
const modalStateAtomFamily = <T>() =>
  atomFamily((key: ModelActionKey) =>
    atom<ModalState<T>>({ data: undefined, isOpen: false, key }),
  )

export const useModalState = <T>(key: ModelActionKey) => {
  const [modalState, setModalState] = useAtom(modalStateAtomFamily<T>()(key))

  const open = (data?: T) => {
    setModalState((state) => ({
      ...state,
      data,
      isOpen: true,
    }))
  }

  const close = () => {
    setModalState((state) => ({
      ...state,
      data: undefined,
      isOpen: false,
    }))
  }

  return {
    close,
    data: modalState.data,
    isOpen: modalState.isOpen,
    modalState,
    open,
  }
}
