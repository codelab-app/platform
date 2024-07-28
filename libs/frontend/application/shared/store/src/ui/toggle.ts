import type { IToggleService } from '@codelab/frontend/abstract/application'
import { atom, useAtom } from 'jotai'
import isEqual from 'lodash/isEqual'
import { useMemo } from 'react'
import { createToggleStateAtom, type ToggleState } from './toggle.state'

const defaultMapper = <TData, TOutput = TData>(state: TData): TOutput =>
  state as unknown as TOutput

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
        (get, set, newState: ToggleState<TData>) => {
          const currentState = get(toggleStateAtom)

          if (!isEqual(currentState, newState)) {
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
