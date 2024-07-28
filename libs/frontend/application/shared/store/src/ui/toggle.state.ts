import type { IToggleService } from '@codelab/frontend/abstract/application'
import type {
  CuiComponentsKey,
  ModelActionKey,
} from '@codelab/frontend/abstract/types'
import { type Atom, atom, useAtom } from 'jotai'
import { atomFamily } from 'jotai/utils'

export interface ToggleState<TData = undefined> {
  data: TData
  isOpen: boolean
}

export const createToggleStateAtom = <TData = undefined>() =>
  atom<ToggleState<TData>>({
    data: undefined,
    isOpen: false,
  })

// type Getter = <Value>(atom: Atom<Value>) => Value

/**
 * Value - value of the atom (the state)
 * Args - args passed into set (the data)
 * Result - return type of set (the state, or mapped state)
 */

type ReadCallback<TData> = (
  atom: Atom<ToggleState<TData>>,
) => Atom<TData>['read']

const toggleStateAtomFamily = <
  TData = undefined,
  TOutput extends Record<string, void> | undefined = undefined,
>(
  dataMapper: (data?: TData) => TOutput,
) =>
  atomFamily(
    ({ action, ui }: { action: ModelActionKey; ui: CuiComponentsKey }) => {
      const toggleStateAtom = createToggleStateAtom<TData>()

      const myAtom = atom<
        ToggleState<TData>,
        [Partial<ToggleState<TData>>],
        TOutput
      >(
        (get) => {
          const currentState = get(toggleStateAtom)

          return {
            ...currentState,
            data: dataMapper(currentState.data),
          }
        },
        (get, set, update: Partial<ToggleState<TData>>) => {
          const newState = { ...get(toggleStateAtom), ...update }

          set(toggleStateAtom, newState)

          return newState
        },
      )

      return myAtom
    },
  )

export const useToggleState = <
  TData = undefined,
  TOutput extends Record<string, void> | undefined = undefined,
>(
  action: ModelActionKey,
  ui: CuiComponentsKey,
  readCallback: ReadCallback<TData>,
): IToggleService<TData, TOutput> => {
  const toggleStateAtom = toggleStateAtomFamily<TData>(readCallback)({
    action,
    ui,
  })

  const [toggleState, setToggleState] = useAtom(toggleStateAtom)

  const open = (data?: TData) => {
    setToggleState({ data, isOpen: true })
  }

  const close = () => {
    setToggleState({ data: undefined, isOpen: false })
  }

  return {
    close,
    data: toggleState.data,
    isOpen: toggleState.isOpen,
    open,
  }
}
