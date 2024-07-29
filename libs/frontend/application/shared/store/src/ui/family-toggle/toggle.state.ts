import type { IToggleService } from '@codelab/frontend/abstract/application'
import type {
  CuiComponentsKey,
  ModelActionKey,
} from '@codelab/frontend/abstract/types'
import { atom, useAtom } from 'jotai'
import { atomFamily } from 'jotai/utils'
import { useMemo } from 'react'
import type { ToggleState } from './toggle.state.interface'

const defaultMapper = <TData, TOutput = TData>(state: TData): TOutput =>
  state as unknown as TOutput

export const createToggleStateAtom = <TData = undefined>() =>
  atom<ToggleState<TData>>({
    data: undefined,
    isOpen: false,
  })

interface IAtomFamilyParm {
  action: ModelActionKey
  ui: CuiComponentsKey
}

export const useToggleState = <TData = undefined, TOutput = TData>(
  key: IAtomFamilyParm,
  mapper: (state?: TData) => TOutput = defaultMapper,
): IToggleService<TData, TOutput> => {
  const toggleStateAtomFamily = useMemo(
    () =>
      atomFamily((_key: IAtomFamilyParm) => {
        const toggleStateAtom = createToggleStateAtom<TData>()

        const derivedAtom = atom(
          (get) => {
            const state = get(toggleStateAtom)

            return {
              ...state,
              data: mapper(state.data),
            }
          },
          (get, set, newState: ToggleState<TData>) => {
            set(toggleStateAtom, newState)
          },
        )

        return derivedAtom
      }),
    [mapper],
  )

  const [toggleState, setToggleState] = useAtom(toggleStateAtomFamily(key))

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
