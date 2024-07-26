import type { IToggleService } from '@codelab/frontend/abstract/application'
import type {
  CuiComponentsKey,
  ModelActionKey,
} from '@codelab/frontend/abstract/types'
import { atom, useAtom } from 'jotai'
import { atomFamily } from 'jotai/utils'

// interface ToggleState<TData = unknown, TOutput = TData> {
//   data?: TOutput
//   isOpen: boolean
//   key: `${ModelActionKey}-${CuiComponentsKey}`
// }

/**
 * atom family is used for dynamic atoms
 */
const toggleStateAtomFamily = <TData, TOutput>() =>
  atomFamily(
    ({ action, ui }: { action: ModelActionKey; ui: CuiComponentsKey }) =>
      atom<IToggleState<TData, TOutput>>({
        data: undefined,
        isOpen: false,
        // key: `${action}-${ui}`,
      }),
  )

export type IToggleState<T = unknown, R = T> = Omit<
  IToggleService<T, R>,
  'key'
> & {
  close(): void
  open(data: T): void
}

/**
 * Composable by form and modals, used internally
 */
export const useToggleState = <TData, TOutput = TData>(
  action: ModelActionKey,
  ui: CuiComponentsKey,
): IToggleState<TData, TOutput> => {
  const [toggleState, setToggleState] = useAtom(
    toggleStateAtomFamily<TData, TOutput>()({ action, ui }),
  )

  const open = (data?: TData, mapper?: (data?: TData) => TOutput) => {
    setToggleState((state) => ({
      ...state,
      data: mapper ? mapper(data) : (data as TOutput),
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
    // state: toggleState,
  }
}
