import type {
  CuiComponentsKey,
  ModelActionKey,
} from '@codelab/frontend/abstract/types'
import { atom, useAtom } from 'jotai'
import { atomFamily } from 'jotai/utils'

interface ToggleState<T = unknown> {
  data?: T
  isOpen: boolean
  key: `${ModelActionKey}-${CuiComponentsKey}`
}

/**
 * atom family is used for dynamic atoms
 */
const toggleStateAtomFamily = <T>() =>
  atomFamily(
    ({ action, ui }: { action: ModelActionKey; ui: CuiComponentsKey }) =>
      atom<ToggleState<T>>({
        data: undefined,
        isOpen: false,
        key: `${action}-${ui}`,
      }),
  )

/**
 * Composable by form and modals, used internally
 */
export const useToggleState = <T>(
  action: ModelActionKey,
  ui: CuiComponentsKey,
) => {
  const [toggleState, setToggleState] = useAtom(
    toggleStateAtomFamily<T>()({ action, ui }),
  )

  const open = (data?: T) => {
    setToggleState((state) => ({
      ...state,
      data,
      isOpen: true,
    }))
  }

  const close = () => {
    setToggleState((state) => ({
      ...state,
      data: undefined,
      isOpen: false,
    }))
  }

  return {
    close,
    data: toggleState.data,
    isOpen: toggleState.isOpen,
    open,
    state: toggleState,
  }
}
