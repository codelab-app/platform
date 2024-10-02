import type { IToggleService } from '@codelab/frontend/abstract/application'

import { atom, useAtom } from 'jotai'
import { useMemo } from 'react'
import { isDeepEqual } from 'remeda'

import type { IToggleState } from '../family-toggle/toggle.state.interface'

const defaultMapper = <TData, TOutput = TData>(state: TData): TOutput =>
  state as unknown as TOutput

export const createToggleStateAtom = <TData = undefined>() =>
  atom<IToggleState<TData>>({
    data: undefined,
    isOpen: false,
  })

export const useToggleState = <TData = undefined, TOutput = TData>(
  mapper: (state: TData) => TOutput = defaultMapper,
): IToggleService<TData, TOutput> => {
  const toggleStateAtom = useMemo(() => createToggleStateAtom<TData>(), [])

  const derivedToggleStateAtom = useMemo(
    () =>
      atom(
        (get) => {
          const state = get(toggleStateAtom)

          return {
            ...state,
            data: state.data !== undefined ? mapper(state.data) : undefined,
          }
        },
        (get, set, newState: IToggleState<TData>) => {
          const currentState = get(toggleStateAtom)

          if (!isDeepEqual(currentState, newState)) {
            set(toggleStateAtom, newState)
          }
        },
      ),
    [toggleStateAtom, mapper],
  )

  const [toggleState, setToggleState] = useAtom(derivedToggleStateAtom)

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
