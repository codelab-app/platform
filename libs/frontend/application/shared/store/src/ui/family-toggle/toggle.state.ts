import type { IToggleService } from '@codelab/frontend/abstract/application'
import type { UiKey } from '@codelab/frontend/abstract/types'
import { atom, useAtom } from 'jotai'
import { atomFamily } from 'jotai/utils'
import { isDeepEqual } from 'remeda'
import type { IToggleState } from './toggle.state.interface'

export const defaultMapper = <TData, TOutput = TData>(state?: TData): TOutput =>
  state as unknown as TOutput

export const createToggleStateAtom = <TData = undefined>() =>
  atom<IToggleState<TData>>({
    data: undefined,
    isOpen: false,
  })

const toggleAtomFamily = atomFamily(
  (key: UiKey) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    atom<IToggleState<any>>({
      data: undefined,
      isOpen: false,
    }),
  isDeepEqual,
)

export const useToggleState = <TData = undefined, TOutput = TData>(
  key: UiKey,
  mapper: (state: TData) => TOutput = defaultMapper,
): IToggleService<TData, TOutput> => {
  const [toggleState, setToggleState] = useAtom(toggleAtomFamily(key))

  const open = (data?: TData) => {
    setToggleState({ data, isOpen: true })
  }

  const close = () => {
    setToggleState({ data: undefined, isOpen: false })
  }

  return {
    close,
    data: toggleState.data && mapper(toggleState.data),
    isOpen: toggleState.isOpen,
    open,
  }
}
