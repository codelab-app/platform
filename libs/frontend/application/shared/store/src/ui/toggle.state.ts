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
const toggleStateAtomFamily = atomFamily(
  ({ action, ui }: { action: ModelActionKey; ui: CuiComponentsKey }) =>
    atom<ToggleState>({
      data: undefined,
      isOpen: false,
      key: `${action}-${ui}`,
    }),
  (a, b) => a.action === b.action && a.ui === b.ui,
)

export type IToggleState<T = unknown> = Omit<ToggleState<T>, 'key'> & {
  close(): void
  open(data: T): void
}

/**
 * Composable by form and modals, used internally
 */
export const useToggleState = <T>(
  action: ModelActionKey,
  ui: CuiComponentsKey,
): IToggleState<T> => {
  const [toggleState, setToggleState] = useAtom(
    toggleStateAtomFamily({ action, ui }),
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
    data: toggleState.data as T,
    isOpen: toggleState.isOpen,
    open,
    // state: toggleState,
  }
}
